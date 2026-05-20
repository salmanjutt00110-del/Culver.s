import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { staggerContainer, fadeUp } from "../animations/variants";
import { menuItems, categories } from "../data/menuItems";
import MenuCard from "./MenuCard";

export default function MenuHighlights() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 500], [0, -80]);

  const filtered = activeCategory === "all"
    ? menuItems
    : menuItems.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="relative py-0 bg-background overflow-hidden">

      {/* ── Blue menu-board header stripe ── */}
      <motion.div className="menu-stripe py-8 px-4 relative overflow-hidden" style={{ y: parallax }}>
        <div className="absolute inset-0 grain-overlay" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative z-10 max-w-7xl mx-auto text-center"
        >
          <motion.p variants={fadeUp} className="font-body font-bold uppercase tracking-[0.25em] text-gold text-xs mb-2">
            Culver's Lakewood
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display font-black text-4xl sm:text-5xl text-white leading-tight tracking-tight">
            Signature Menu
          </motion.h2>
          <motion.p variants={fadeUp} className="font-body text-white/70 mt-2 text-sm max-w-md mx-auto">
            Hover any item to see ingredients — tap to order online
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Gold divider stripe */}
      <div className="h-[5px] bg-gold w-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Category tabs ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-5 py-2 rounded-md font-body font-bold text-sm transition-all duration-300 border-2 ${
                activeCategory === cat.id
                  ? "bg-culvblue text-white border-culvblue shadow-lg"
                  : "bg-white text-navy border-culvblue/30 hover:border-culvblue hover:text-culvblue"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* ── Cards grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-body text-muted-foreground text-xs mt-8"
        >
          * Prices are starting prices and may vary. Menu items subject to availability.
        </motion.p>
      </div>
    </section>
  );
}