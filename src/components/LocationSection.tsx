import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, Clock, Users } from "lucide-react";

const details = [
  { icon: Calendar, label: "Date", value: "28th & 29th March 2026" },
  { icon: Clock, label: "Time", value: "8:00 AM — 6:00 PM" },
  { icon: MapPin, label: "Location", value: "Abuja, Nigeria" },
  { icon: Users, label: "Capacity", value: "Limited to 100 Guests" },
];

const LocationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="location" className="section-padding relative">
      <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="mx-auto max-w-7xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 font-body text-sm tracking-[0.3em] text-primary">
            JOIN US
          </p>
          <h2 className="font-display text-4xl font-bold md:text-5xl lg:text-6xl">
            The <span className="glow-text">Details</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {details.map((detail, i) => (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="glass-card p-6 text-center transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_hsl(165_80%_45%/0.15)]"
            >
              <detail.icon className="mx-auto mb-4 h-6 w-6 text-primary" />
              <p className="mb-1 font-body text-xs tracking-[0.2em] text-muted-foreground">
                {detail.label}
              </p>
              <p className="font-display text-lg font-semibold">
                {detail.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
