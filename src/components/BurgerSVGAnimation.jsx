import { motion } from "framer-motion";

const layers = [
  { id: "top-bun", y: 20, w: 160, h: 45, rx: 80, color: "#C8762A", delay: 0.0 },
  { id: "lettuce", y: 58, w: 175, h: 14, rx: 7, color: "#4CAF50", delay: 0.3 },
  { id: "cheese", y: 68, w: 165, h: 10, rx: 3, color: "#F5B800", delay: 0.5 },
  { id: "patty", y: 74, w: 160, h: 28, rx: 6, color: "#6B3A2A", delay: 0.7 },
  { id: "bacon", y: 98, w: 155, h: 10, rx: 3, color: "#8B1A1A", delay: 0.9 },
  { id: "tomato", y: 104, w: 150, h: 12, rx: 6, color: "#E53935", delay: 1.1 },
  { id: "bottom-bun", y: 112, w: 160, h: 30, rx: 15, color: "#C8762A", delay: 1.3 },
];

const seeds = [60, 85, 110, 130];
const steamPaths = [85, 100, 115];

export default function BurgerSVGAnimation() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 180" className="overflow-visible">
      <motion.ellipse
        cx="100" cy="175" rx="75" ry="8"
        fill="rgba(0,0,0,0.3)"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.4 }}
      />

      {layers.map((layer) => (
        <motion.rect
          key={layer.id}
          x={(200 - layer.w) / 2}
          y={layer.y}
          width={layer.w}
          height={layer.h}
          rx={layer.rx}
          fill={layer.color}
          initial={{ y: layer.y - 80, opacity: 0 }}
          animate={{ y: layer.y, opacity: 1 }}
          transition={{ delay: layer.delay, type: "spring", stiffness: 300, damping: 18 }}
        />
      ))}

      {seeds.map((cx, i) => (
        <motion.ellipse
          key={`seed-${i}`}
          cx={cx} cy={28} rx={5} ry={3}
          fill="#F5E6C8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 + i * 0.05, type: "spring", stiffness: 400 }}
        />
      ))}

      {steamPaths.map((cx, i) => (
        <motion.path
          key={`steam-${i}`}
          d={`M${cx} 15 Q${cx + 8} 8 ${cx} 1 Q${cx - 8} -6 ${cx} -13`}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1], opacity: [0, 0.7, 0], y: [0, -10, -20] }}
          transition={{ delay: 1.8 + i * 0.15, duration: 1.2, repeat: Infinity, repeatDelay: 0.5 }}
        />
      ))}
    </svg>
  );
}