import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { RESTAURANT } from "../data/constants";
import { staggerContainer, fadeUp, buttonTap } from "../animations/variants";

export default function OrderCTA() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="animate-gradient py-20 md:py-28"
        style={{
          background: "linear-gradient(135deg, #0D2F6B 0%, #1A5CB8 40%, #0D2F6B 70%, #1a3a8f 100%)",
          backgroundSize: "200% 200%",
        }}
      >
        {/* Gold top border */}
        <div className="absolute top-0 left-0 right-0 h-[5px] bg-gold" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <motion.p variants={fadeUp} className="font-accent text-gold text-lg md:text-xl mb-4">
            Don't Wait — Satisfy Your Craving
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-6">
            Ready for a
            <br />
            <span className="text-gold">ButterBurger?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="font-body text-white/75 text-lg max-w-xl mx-auto mb-8">
            Order online for pickup or stop by our Lakewood location.
            Open daily from 10 AM to 10 PM.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            <motion.a
              href={RESTAURANT.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={buttonTap.tap}
              className="px-8 py-4 bg-gold text-navy font-body font-bold text-base rounded-md hover:bg-gold/90 transition-colors shadow-xl flex items-center gap-2"
            >
              Order Now <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={`tel:${RESTAURANT.phoneRaw}`}
              whileHover={{ scale: 1.05 }}
              whileTap={buttonTap.tap}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-body font-bold text-base rounded-md hover:bg-white/10 transition-colors"
            >
              Call Us
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Gold bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-[5px] bg-gold" />
      </div>
    </section>
  );
}