import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Users, Leaf, CalendarDays } from "lucide-react";
import { staggerContainer, fadeUp } from "../animations/variants";

function CountUp({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const increment = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="font-display font-black text-4xl md:text-5xl text-culvblue">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { icon: Users, value: 1000, suffix: "+", label: "Happy Reviews", description: "Real customers who love our food" },
  { icon: Leaf, value: 100, suffix: "%", label: "Fresh, Never Frozen", description: "Quality ingredients in every meal" },
  { icon: CalendarDays, value: 1984, suffix: "", label: "Established", description: "Decades of serving great food" },
];

export default function About() {
  const { scrollY } = useScroll();
  const parallax1 = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section id="about" className="relative py-0 bg-background overflow-hidden">
      {/* Blue header stripe */}
      <motion.div className="menu-stripe py-8 px-4" style={{ y: parallax1 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.p variants={fadeUp} className="font-body font-bold uppercase tracking-[0.25em] text-gold text-xs mb-2">
            Our Story
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display font-black text-4xl sm:text-5xl text-white leading-tight">
            Built on Quality
          </motion.h2>
        </motion.div>
      </motion.div>
      <div className="h-[5px] bg-gold w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-muted-foreground text-lg max-w-2xl mx-auto text-center mb-10 leading-relaxed"
        >
          Since 1984, Culver's has been committed to serving fresh, made-to-order meals with
          genuine hospitality. Our Lakewood location carries on that tradition every single day.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="text-center bg-white rounded-lg p-8 shadow-md border-t-4 border-culvblue"
            >
              <div className="w-14 h-14 rounded-md bg-culvblue flex items-center justify-center mx-auto mb-5">
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <CountUp target={stat.value} suffix={stat.suffix} />
              <p className="font-body font-bold text-navy text-lg mt-2">{stat.label}</p>
              <p className="font-body text-muted-foreground text-sm mt-1">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}