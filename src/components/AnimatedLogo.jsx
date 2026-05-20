import { motion } from "framer-motion";

export default function AnimatedLogo({ size = "md", theme = "dark" }) {
  const scales = { sm: 0.65, md: 1, lg: 1.4 };
  const scale = scales[size];
  const textColor  = theme === "dark" ? "#0D2F6B" : "#FFFFFF";
  const subColor   = theme === "dark" ? "#1A5CB8" : "#F5B800";

  return (
    <motion.div
      className="flex items-center gap-2 cursor-pointer select-none"
      whileHover="hover"
      initial="rest"
    >
      <motion.svg
        width={42 * scale} height={42 * scale} viewBox="0 0 42 42" fill="none"
        variants={{ hover: { rotate: [0, -8, 8, -4, 0] } }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <circle cx="21" cy="21" r="21" fill="#1A5CB8" />
        <motion.rect x="9" y="12" width="24" height="7" rx="3.5" fill="#C8762A"
          variants={{ hover: { y: [12, 9, 12] } }} transition={{ duration: 0.4, delay: 0.05 }} />
        <ellipse cx="17" cy="14" rx="1.5" ry="1" fill="#F5E6C8" />
        <ellipse cx="21" cy="13" rx="1.5" ry="1" fill="#F5E6C8" />
        <ellipse cx="25" cy="14" rx="1.5" ry="1" fill="#F5E6C8" />
        <rect x="8"  y="20"   width="26" height="3"   rx="1.5" fill="#4CAF50" />
        <rect x="9"  y="23"   width="24" height="2.5" rx="1"   fill="#F5B800" />
        <rect x="9"  y="25.5" width="24" height="5"   rx="2"   fill="#6B3A2A" />
        <motion.rect x="9" y="30.5" width="24" height="5" rx="2.5" fill="#C8762A"
          variants={{ hover: { y: [30.5, 33, 30.5] } }} transition={{ duration: 0.4, delay: 0.05 }} />
      </motion.svg>

      <div className="flex flex-col leading-none">
        <motion.span
          className="font-display font-black"
          style={{ fontSize: `${22 * scale}px`, color: textColor, letterSpacing: "-0.02em" }}
          variants={{ rest: {}, hover: { letterSpacing: "0.04em" } }}
          transition={{ duration: 0.3 }}
        >
          Culver's
        </motion.span>
        <motion.span
          className="font-body font-bold uppercase"
          style={{ fontSize: `${9 * scale}px`, color: subColor, letterSpacing: "0.15em" }}
          variants={{ rest: { opacity: 0.8 }, hover: { opacity: 1, letterSpacing: "0.25em" } }}
          transition={{ duration: 0.3 }}
        >
          Lakewood
        </motion.span>
      </div>
    </motion.div>
  );
}