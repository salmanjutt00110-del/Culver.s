import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ExternalLink, Mail, CheckCircle } from "lucide-react";
import { RESTAURANT } from "../data/constants";
import { staggerContainer, fadeLeft, fadeRight, fadeUp } from "../animations/variants";

function isOpenNow() {
  const now = new Date();
  const totalMins = now.getHours() * 60 + now.getMinutes();
  return totalMins >= 600 && totalMins < 1320;
}

export default function Location() {
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;
  const open = isOpenNow();

  return (
    <section id="location" className="relative pb-0 overflow-hidden bg-background">

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
            Lakewood, Colorado
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display font-black text-4xl sm:text-5xl text-white leading-tight">
            Contact & Location
          </motion.h2>
        </motion.div>
      </div>
      <div className="h-[5px] bg-gold w-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* ── Left: Info ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeLeft}
            className="space-y-5"
          >
            {/* Open/Closed badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-body font-bold border-2 ${
              open
                ? "bg-green-50 text-green-700 border-green-300"
                : "bg-red-50 text-red-700 border-red-200"
            }`}>
              <span className={`w-2.5 h-2.5 rounded-full ${open ? "bg-green-500 animate-pulse" : "bg-red-400"}`} />
              {open ? "Open Now" : "Currently Closed"} · {RESTAURANT.hours}
            </div>

            {/* Contact info cards */}
            {[
              { icon: MapPin, title: "Address", value: RESTAURANT.address, action: { label: "Get Directions", href: RESTAURANT.mapsDirectionsUrl } },
              { icon: Phone,  title: "Phone",   value: RESTAURANT.phone,   action: { label: "Call Now",       href: `tel:${RESTAURANT.phoneRaw}` } },
              { icon: Mail,   title: "Email",   value: "lakewood@culvers.com", action: { label: "Send Email", href: "mailto:lakewood@culvers.com" } },
            ].map(({ icon: Icon, title, value, action }) => (
              <div key={title} className="flex items-start gap-4 p-4 rounded-lg bg-white border-l-4 border-culvblue shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-md bg-culvblue flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-body text-culvblue text-xs uppercase tracking-widest font-bold mb-0.5">{title}</p>
                  <p className="font-body text-navy font-semibold">{value}</p>
                  <a href={action.href} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-gold font-body font-bold text-xs mt-1 hover:underline">
                    {action.label} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}

            {/* Hours table */}
            <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="menu-stripe px-4 py-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold" />
                <h3 className="font-body font-bold text-white text-sm uppercase tracking-widest">Operating Hours</h3>
              </div>
              <div className="p-3 space-y-0.5">
                {RESTAURANT.hoursDetail.map((row, i) => (
                  <div key={row.day}
                    className={`flex justify-between font-body text-sm py-2 px-3 rounded transition-colors ${
                      i === todayIndex
                        ? "bg-culvblue/8 border border-culvblue/20"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <span className={`flex items-center gap-2 ${i === todayIndex ? "text-culvblue font-bold" : "text-muted-foreground"}`}>
                      {i === todayIndex && <CheckCircle className="w-3.5 h-3.5 text-green-500" />}
                      {row.day}
                      {i === todayIndex && <span className="text-gold text-[10px] font-black uppercase tracking-wider">Today</span>}
                    </span>
                    <span className={i === todayIndex ? "text-culvblue font-bold" : "text-muted-foreground"}>
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: Map ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeRight}
            className="flex flex-col gap-4"
          >
            <div className="rounded-lg overflow-hidden shadow-xl border-2 border-culvblue/20 flex-1 min-h-[420px]">
              <iframe
                src={RESTAURANT.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "420px", display: "block" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Culver's Lakewood Location Map"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <motion.a href={RESTAURANT.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 bg-culvblue text-white font-body font-bold text-sm py-3.5 rounded-md hover:bg-navy transition-colors shadow">
                <MapPin className="w-4 h-4" /> Get Directions
              </motion.a>
              <motion.a href={`tel:${RESTAURANT.phoneRaw}`}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 bg-white border-2 border-culvblue text-culvblue font-body font-bold text-sm py-3.5 rounded-md hover:bg-culvblue/5 transition-colors">
                <Phone className="w-4 h-4" /> Call Us
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}