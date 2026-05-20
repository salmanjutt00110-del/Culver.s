import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { reviews } from "../data/reviews";

const AUTOPLAY_INTERVAL = 4500;

function StarRow({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-gold text-gold" : "text-border"}`} />
      ))}
    </div>
  );
}

export default function ReviewSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const go = useCallback((idx, dir) => { setDirection(dir); setCurrent(idx); }, []);
  const next = useCallback(() => go((current + 1) % reviews.length, 1), [current, go]);
  const prev = useCallback(() => go((current - 1 + reviews.length) % reviews.length, -1), [current, go]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [paused, next]);

  const variants = {
    enter: (d) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  const review = reviews[current];

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Progress bar */}
      <div className="h-[3px] bg-culvblue/15 rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full bg-culvblue rounded-full"
          key={current}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: "linear" }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      {/* Card */}
      <div className="overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={review.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-lg shadow-lg border-l-4 border-culvblue p-6 md:p-8"
          >
            {/* Blue quote mark */}
            <div className="font-display text-[100px] leading-none text-culvblue/10 select-none -mt-4 -mb-6" aria-hidden>"</div>

            <StarRow rating={review.rating} />

            <blockquote className="mt-4 font-body text-foreground/80 text-base md:text-lg leading-relaxed">
              "{review.text}"
            </blockquote>

            <div className="mt-6 flex items-center gap-4">
              <div className="w-11 h-11 rounded-md bg-culvblue flex items-center justify-center flex-shrink-0 shadow">
                <span className="font-display font-black text-white text-lg">{review.avatar}</span>
              </div>
              <div>
                <p className="font-body font-bold text-navy">{review.name}</p>
                <p className="font-body text-muted-foreground text-sm flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-culvblue" /> {review.neighborhood}
                </p>
              </div>
              <div className="ml-auto text-muted-foreground font-body text-sm hidden sm:block">{review.date}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-5">
        <div className="flex gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? 1 : -1)}
              className={`rounded-sm transition-all duration-300 ${
                i === current ? "w-7 h-2.5 bg-culvblue" : "w-2.5 h-2.5 bg-culvblue/25 hover:bg-culvblue/50"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={prev} className="w-9 h-9 rounded-md border-2 border-culvblue/30 bg-white hover:border-culvblue text-culvblue transition-all flex items-center justify-center">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={next} className="w-9 h-9 rounded-md bg-culvblue text-white hover:bg-navy transition-all flex items-center justify-center">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-center font-body text-muted-foreground text-xs mt-3">{current + 1} / {reviews.length}</p>
    </div>
  );
}