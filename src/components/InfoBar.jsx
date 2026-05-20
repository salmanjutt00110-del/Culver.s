import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";
import { RESTAURANT } from "../data/constants";
import { fadeUp } from "../animations/variants";

const pills = [
  { icon: MapPin, text: RESTAURANT.address },
  { icon: Phone, text: RESTAURANT.phone },
  { icon: Clock, text: `Open Daily: ${RESTAURANT.hours}` },
];

export default function InfoBar() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeUp}
      className="relative z-20 -mt-8"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="menu-stripe rounded-xl shadow-2xl shadow-culvblue/30 px-6 py-5 border-b-4 border-gold">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 md:divide-x md:divide-white/20">
            {pills.map((pill, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-3 px-6 py-2 cursor-default"
              >
                <pill.icon className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-white font-body text-sm font-semibold">{pill.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}