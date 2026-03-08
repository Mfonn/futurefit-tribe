import { motion } from "framer-motion";
import heroImg from "@/assets/hero-tennis.jpg";

const HeroSection = () => {
  return (
    <section id="experience" className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Futuristic tennis event"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 to-transparent" />
      </div>

      {/* Floating orbs */}
      <div className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-primary/10 blur-[100px] orb-float" />
      <div className="absolute right-[15%] top-[40%] h-48 w-48 rounded-full bg-bio-teal/10 blur-[80px] orb-float-delayed" />
      <div className="absolute bottom-[20%] left-[40%] h-56 w-56 rounded-full bg-bio-cyan/8 blur-[90px] orb-float-slow" />

      {/* Content */}
      <div className="relative flex min-h-screen items-end pb-20 md:items-center md:pb-0">
        <div className="section-padding w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="max-w-2xl"
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-4 font-body text-sm tracking-[0.3em] text-primary"
            >
              ABUJA, NIGERIA · MARCH 2026
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mb-6 font-display text-5xl font-bold leading-[1.1] md:text-7xl lg:text-8xl"
            >
              Where
              <br />
              <span className="glow-text">Science</span>
              <br />
              Meets Sweat
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mb-10 max-w-md font-body text-lg leading-relaxed text-muted-foreground"
            >
              A wellness experience fusing competitive tennis, restorative yoga, 
              and a bio-engineered herbal bar — designed to unlock your body's potential.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#rsvp"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-4 font-body text-sm font-semibold tracking-wide text-primary-foreground transition-all duration-500 hover:shadow-[0_0_40px_hsl(165_80%_45%/0.4)]"
              >
                <span className="relative z-10">Reserve Your Spot</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#bio-bar"
                className="glass-card inline-flex items-center gap-2 rounded-full px-8 py-4 font-body text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/50"
              >
                Explore the Bio Bar
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom breathing line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent breathing" />
    </section>
  );
};

export default HeroSection;
