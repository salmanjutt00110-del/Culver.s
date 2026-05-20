import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Star, MapPin } from "lucide-react";
import Tilt from "react-parallax-tilt";
import { RESTAURANT } from "../data/constants";
import { staggerContainer, fadeUp, buttonTap } from "../animations/variants";

const HERO_IMAGE = "https://media.db.com/images/public/6a0d074461a7dedb149e2265/57ade102c_generated_62bf8bdb.png";
const BURGER_IMAGE = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop";

export default function Hero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={HERO_IMAGE}
          alt="Delicious ButterBurger with melting cheese and fresh toppings"
          className="w-full h-[120%] object-cover"
        />
      </motion.div>

      {/* Blue-navy gradient overlay — matches Culver's menu board */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-culvblue/75 to-transparent" />
      <div className="absolute inset-0 grain-overlay" />

      {/* Blue stripe accent at bottom */}
      <div className="absolute bottom-0 left-0 right-0 diner-divider" />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-0 grid md:grid-cols-2 items-center gap-8"
      >
        <div className="max-w-2xl">
          {/* Rating badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 px-4 py-2 rounded-md text-white text-sm font-body">
              <Star className="w-4 h-4 fill-gold text-gold" />
              <span className="font-bold">{RESTAURANT.rating}</span>
              <span className="opacity-70">·</span>
              <span>{RESTAURANT.reviewCount} Happy Customers</span>
            </span>
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="font-body font-bold uppercase tracking-[0.2em] text-gold text-sm mb-4"
          >
            Lakewood's Favorite
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-black text-white text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-6"
          >
            Lakewood's
            <br />
            Favorite
            <br />
            <span className="text-gold">ButterBurger</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p variants={fadeUp} className="font-body text-white/80 text-lg sm:text-xl max-w-lg mb-8 leading-relaxed">
            {RESTAURANT.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <motion.a
              href="#menu"
              whileHover={{ scale: 1.05 }}
              whileTap={buttonTap.tap}
              className="px-8 py-4 bg-white text-navy font-body font-bold text-base rounded-md hover:bg-cream transition-colors shadow-xl"
            >
              View Our Menu
            </motion.a>
            <motion.a
              href={RESTAURANT.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={buttonTap.tap}
              className="px-8 py-4 bg-gold text-navy font-body font-bold text-base rounded-md hover:bg-gold/90 transition-colors shadow-xl flex items-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              Get Directions
            </motion.a>
          </motion.div>
        </div>

        {/* 3D Rotating Burger */}
        <motion.div variants={fadeUp} className="hidden md:flex justify-center items-center h-full">
          <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} scale={1.05} transitionSpeed={400}>
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative w-64 h-64 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/30 via-transparent to-gold/20 rounded-full blur-3xl" />
              <img
                src={BURGER_IMAGE}
                alt="3D Rotating ButterBurger"
                className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-gold"
              />
            </motion.div>
          </Tilt>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="text-white w-8 h-8 opacity-70" />
      </motion.div>
    </section>
  );
}