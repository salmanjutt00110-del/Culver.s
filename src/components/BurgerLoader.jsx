import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import BurgerSVGAnimation from "./BurgerSVGAnimation";

export default function BurgerLoader({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 600);
    }, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(135deg, #0D2F6B 0%, #1A5CB8 100%)" }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <BurgerSVGAnimation />

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.6 }}
          >
            <p className="text-gold font-accent text-2xl tracking-widest">
              Fresh. Never Frozen.
            </p>
            <motion.div
              className="mt-3 h-[3px] bg-white mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ delay: 2.4, duration: 0.5 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}