import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";
import { RESTAURANT, NAV_LINKS } from "../data/constants";
import { staggerContainer, fadeUp } from "../animations/variants";

export default function Footer() {
  return (
    <footer className="bg-navy border-t-4 border-gold pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10"
        >
          {/* Logo */}
          <motion.div variants={fadeUp}>
            <AnimatedLogo size="md" theme="light" />
            <p className="font-body text-white/50 text-sm mt-4 max-w-xs leading-relaxed">{RESTAURANT.tagline}</p>
          </motion.div>

          {/* Links */}
          <motion.div variants={fadeUp}>
            <h4 className="font-body font-black text-white text-xs uppercase tracking-[0.2em] mb-4 border-b border-culvblue/40 pb-2">
              Quick Links
            </h4>
            <div className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ x: 5, color: "#F5B800" }}
                  className="block font-body text-white/60 text-sm hover:text-gold transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp}>
            <h4 className="font-body font-black text-white text-xs uppercase tracking-[0.2em] mb-4 border-b border-culvblue/40 pb-2">
              Contact
            </h4>
            <div className="space-y-2.5 font-body text-white/60 text-sm">
              <p>{RESTAURANT.address}</p>
              <a href={`tel:${RESTAURANT.phoneRaw}`} className="block hover:text-gold transition-colors">{RESTAURANT.phone}</a>
              <p>Open Daily: {RESTAURANT.hours}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="diner-divider rounded-full mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-white/30 text-xs">
            © {new Date().getFullYear()} Culver's Lakewood. All rights reserved.
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 text-white/40 hover:text-gold font-body text-xs transition-colors"
          >
            Back to top <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}