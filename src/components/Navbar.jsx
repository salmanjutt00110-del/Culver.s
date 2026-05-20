import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";
import { NAV_LINKS, RESTAURANT } from "../data/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/97 backdrop-blur-md shadow-lg border-b-4 border-culvblue py-2"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#hero">
          <AnimatedLogo size="md" theme={scrolled ? "dark" : "light"} />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative font-body font-semibold text-sm tracking-wide transition-colors duration-300 ${
                scrolled ? "text-navy" : "text-white"
              } hover:text-culvblue after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-culvblue after:w-0 hover:after:w-full after:transition-all after:duration-300`}
            >
              {link.label}
            </a>
          ))}
          <motion.a
            href={RESTAURANT.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-culvblue text-white px-6 py-2.5 rounded-md font-body font-bold text-sm hover:bg-navy transition-colors shadow-lg"
          >
            Order Now
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden relative z-50 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className={`w-6 h-6 ${scrolled || mobileOpen ? "text-navy" : "text-white"}`} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu className={`w-6 h-6 ${scrolled ? "text-navy" : "text-white"}`} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white border-t-4 border-culvblue overflow-hidden shadow-xl"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-body font-bold text-lg text-navy hover:text-culvblue transition-colors border-b border-border pb-3 last:border-0"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={RESTAURANT.orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 bg-culvblue text-white text-center px-5 py-3 rounded-md font-body font-bold"
              >
                Order Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}