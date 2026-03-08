import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const RSVPSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute left-1/4 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute right-1/4 top-1/3 h-60 w-60 rounded-full bg-warm-rose/5 blur-[100px]" />

      <div className="mx-auto max-w-2xl text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 font-body text-sm tracking-[0.3em] text-primary">
            LIMITED SPOTS
          </p>
          <h2 className="mb-6 font-display text-4xl font-bold md:text-5xl lg:text-6xl">
            Secure your{" "}
            <span className="glow-text">invitation</span>
          </h2>
          <p className="mb-12 font-body text-base leading-relaxed text-muted-foreground">
            This is an intimate experience limited to 100 guests. 
            Enter your details to reserve your place at the intersection of 
            science, sport, and restoration.
          </p>
        </motion.div>

        {!submitted ? (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="First Name"
                required
                className="glass-card w-full px-5 py-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="Last Name"
                required
                className="glass-card w-full px-5 py-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              required
              className="glass-card w-full px-5 py-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="glass-card w-full px-5 py-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="group mt-4 w-full rounded-full bg-primary py-4 font-body text-sm font-semibold tracking-wide text-primary-foreground transition-all duration-500 hover:shadow-[0_0_50px_hsl(165_80%_45%/0.4)]"
            >
              Reserve My Spot →
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-card glow-border p-10"
          >
            <div className="mb-4 text-4xl">✦</div>
            <h3 className="mb-2 font-display text-2xl font-bold glow-text">
              You're In
            </h3>
            <p className="font-body text-sm text-muted-foreground">
              We'll send you the details soon. Prepare to be transformed.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RSVPSection;
