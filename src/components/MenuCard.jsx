import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { RESTAURANT } from "../data/constants";

export default function MenuCard({ item }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Tilt tiltMaxAngleX={12} tiltMaxAngleY={12} scale={1.02} transitionSpeed={400}>
      <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden bg-white border-2 border-border rounded-lg shadow-md"
      style={{ boxShadow: hovered ? "0 12px 40px rgba(26,92,184,0.18)" : "0 2px 12px rgba(0,0,0,0.07)", borderColor: hovered ? "#1A5CB8" : undefined, transition: "box-shadow 0.3s, border-color 0.3s" }}
    >
      {/* ── Image ── */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.45 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        {/* Ingredient overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.32 }}
              className="absolute inset-0 flex flex-col justify-end p-3"
              style={{ background: "linear-gradient(to top, rgba(13,47,107,0.93) 55%, rgba(13,47,107,0.35) 100%)" }}
            >
              <p className="text-white/60 font-body text-[10px] uppercase tracking-[0.18em] mb-1.5">Ingredients</p>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing) => (
                  <span key={ing} className="bg-white/15 border border-white/25 text-white font-body text-xs px-2.5 py-0.5 rounded">
                    {ing}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Badge */}
        {item.badge && (
          <div className="absolute top-2.5 right-2.5 bg-culvblue text-white font-body font-bold text-[10px] px-2.5 py-1 rounded shadow-lg z-10 uppercase tracking-wide">
            {item.badge}
          </div>
        )}

        {/* Price */}
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <span className="bg-gold text-navy font-body font-black text-sm px-3 py-0.5 rounded shadow">
            From {item.price}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-4">
        {/* Blue top border stripe */}
        <div className="h-[3px] w-10 bg-culvblue rounded-full mb-3" />
        <p className="font-body font-bold uppercase tracking-[0.15em] text-culvblue text-[10px] mb-1">{item.tagline}</p>
        <h3 className="font-display font-black text-lg text-navy mb-1.5 leading-tight">{item.name}</h3>
        <p className="font-body text-muted-foreground text-sm leading-relaxed flex-1">{item.description}</p>

        <motion.a
          href={RESTAURANT.orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          animate={hovered
            ? { backgroundColor: "#1A5CB8", color: "#FFFFFF" }
            : { backgroundColor: "#EFF4FF", color: "#1A5CB8" }}
          transition={{ duration: 0.2 }}
          className="mt-4 block text-center font-body font-bold text-sm py-2.5 rounded-md"
        >
          Order This Item →
        </motion.a>
      </div>
      </motion.div>
    </Tilt>
  );
}