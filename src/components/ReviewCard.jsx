import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { fadeUp } from "../animations/variants";

export default function ReviewCard({ review }) {
  return (
    <motion.div
      variants={fadeUp}
      className="relative bg-cream rounded-2xl p-6 md:p-8 shadow-lg border border-border/50 h-full"
    >
      {/* Quote icon */}
      <div className="absolute top-4 left-4 text-heritage/10">
        <Quote className="w-12 h-12 fill-current" />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4 relative z-10">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-gold text-gold" />
        ))}
      </div>

      {/* Text */}
      <p className="font-body text-foreground/80 text-base leading-relaxed mb-6 relative z-10">
        "{review.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 relative z-10">
        <div className="w-10 h-10 rounded-full bg-heritage/10 flex items-center justify-center">
          <span className="font-display font-bold text-heritage text-sm">
            {review.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-body font-semibold text-foreground text-sm">{review.name}</p>
          <p className="font-body text-muted-foreground text-xs">{review.date}</p>
        </div>
      </div>
    </motion.div>
  );
}