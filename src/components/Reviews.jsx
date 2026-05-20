import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { staggerContainer, fadeUp, fadeRight } from "../animations/variants";
import { RESTAURANT } from "../data/constants";
import ReviewSlider from "./ReviewSlider";

export default function Reviews() {
  return (
    <section id="reviews" className="relative py-0 overflow-hidden bg-background">

      {/* Blue header stripe */}
      <div className="menu-stripe py-8 px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.p variants={fadeUp} className="font-body font-bold uppercase tracking-[0.25em] text-gold text-xs mb-2">
            Community Testimonials
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display font-black text-4xl sm:text-5xl text-white leading-tight">
            Loved by Lakewood
          </motion.h2>
        </motion.div>
      </div>
      <div className="h-[5px] bg-gold w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">

          {/* Left: aggregate score */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="lg:col-span-2"
          >
            <motion.p variants={fadeUp} className="font-body text-muted-foreground text-base leading-relaxed mb-8 max-w-sm">
              Real reviews from real neighbors across Lakewood — sharing their Culver's experience.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="inline-flex flex-col bg-white rounded-lg p-6 shadow-lg border-l-4 border-culvblue"
            >
              <div className="flex items-end gap-3 mb-2">
                <span className="font-display font-black text-5xl text-culvblue leading-none">
                  {RESTAURANT.rating}
                </span>
                <div className="pb-1">
                  <div className="flex gap-1 mb-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                    ))}
                    <Star className="w-5 h-5 text-gold" />
                  </div>
                  <p className="font-body text-muted-foreground text-xs">{RESTAURANT.reviewCount} Google reviews</p>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/place/Culver's/@39.6801311,-105.0808293,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-culvblue font-body font-semibold text-xs hover:underline mt-1"
              >
                View on Google <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Slider */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeRight}
            className="lg:col-span-3"
          >
            <ReviewSlider />
          </motion.div>
        </div>
      </div>
    </section>
  );
}