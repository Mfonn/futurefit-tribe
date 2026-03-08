import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Brain, Bone, Wind, Sparkles, Shield } from "lucide-react";
import pilatesHeroVideo from "@/assets/pilates-hero-video.mp4";
import pilatesChairImg from "@/assets/pilates-chair.jpg";
import pilatesReformerImg from "@/assets/pilates-reformer.jpg";
import pilatesMatImg from "@/assets/pilates-mat.jpg";

const benefits = [
  {
    icon: Bone,
    title: "Chronic Disorder Relief",
    description:
      "Clinical studies show Pilates significantly reduces pain and improves function in osteoarthritis, fibromyalgia, and chronic lower back conditions through controlled, low-impact movement.",
  },
  {
    icon: Brain,
    title: "Nervous System Regulation",
    description:
      "Pilates activates your parasympathetic nervous system — shifting your body from fight-or-flight into rest-and-repair mode, reducing cortisol and calming anxiety.",
  },
  {
    icon: Wind,
    title: "Breath Mastery",
    description:
      "Lateral thoracic breathing techniques expand rib cage mobility, increase oxygen uptake, and train diaphragmatic control — essential for stress management and athletic performance.",
  },
  {
    icon: Heart,
    title: "Osteoarthritis Support",
    description:
      "Targeted exercises strengthen the muscles surrounding affected joints, improving stability and reducing inflammation without the impact that worsens degeneration.",
  },
  {
    icon: Shield,
    title: "Core Rehabilitation",
    description:
      "From postpartum recovery to spinal disc injuries, Pilates rebuilds deep stabilizer muscles that protect your spine and restore functional movement patterns.",
  },
  {
    icon: Sparkles,
    title: "Mind-Body Integration",
    description:
      "Every movement demands precision and presence — Pilates rewires your proprioception, body awareness, and mental focus through intentional, controlled sequences.",
  },
];

const pilatesTypes = [
  {
    title: "Wunda Chair",
    level: "Intermediate to Advanced",
    image: pilatesChairImg,
    description:
      "The Wunda chair challenges your stability and core strength through spring-loaded resistance. Compact but fierce — it targets deep stabilizers, improves balance, and builds functional power. Our structured program format means you'll clearly track your progression from foundational to advanced movements.",
    highlights: ["Deep core activation", "Balance & stability", "Program-based progression", "Postural correction"],
  },
  {
    title: "Reformer",
    level: "Beginner to Advanced",
    image: pilatesReformerImg,
    description:
      "The reformer is the crown jewel of Pilates apparatus. Using adjustable spring resistance on a sliding carriage, it creates a full-body workout that lengthens, strengthens, and sculpts. Our classes run in a structured program format — so you can clearly see your progressions from beginner to advanced.",
    highlights: ["Full-body sculpting", "Joint-friendly resistance", "Clear level progression", "Muscle lengthening"],
  },
  {
    title: "Mat Pilates",
    level: "Beginner to Advanced",
    image: pilatesMatImg,
    description:
      "Where it all began. Mat Pilates uses your own body weight as resistance, making it accessible anywhere. Don't let the simplicity fool you — mastering mat work builds incredible core strength and body control. Each program level builds on the last, so your growth is visible and measurable.",
    highlights: ["No equipment needed", "Core foundation", "Structured programs", "Body awareness"],
  },
];

const BenefitCard = ({ benefit, index }: { benefit: (typeof benefits)[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_hsl(165_80%_45%/0.15)]"
    >
      <benefit.icon className="mb-4 h-6 w-6 text-primary" />
      <h3 className="mb-2 font-display text-lg font-semibold">{benefit.title}</h3>
      <p className="font-body text-sm leading-relaxed text-muted-foreground">
        {benefit.description}
      </p>
    </motion.div>
  );
};

const PilatesTypeSection = ({
  type,
  index,
  reversed,
}: {
  type: (typeof pilatesTypes)[0];
  index: number;
  reversed: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${reversed ? "lg:[direction:rtl]" : ""}`}
    >
      <div className={reversed ? "lg:[direction:ltr]" : ""}>
        <div className="overflow-hidden rounded-2xl">
          <img
            src={type.image}
            alt={type.title}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>

      <div className={reversed ? "lg:[direction:ltr]" : ""}>
        <span className="mb-3 inline-block rounded-full border border-warm-rose/30 bg-warm-rose/5 px-3 py-1 font-body text-xs tracking-[0.2em] text-warm-rose">
          {type.level}
        </span>
        <h3 className="mb-4 font-display text-3xl font-bold md:text-4xl">
          {type.title}
        </h3>
        <p className="mb-6 font-body text-base leading-relaxed text-muted-foreground">
          {type.description}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {type.highlights.map((h) => (
            <div
              key={h}
              className="flex items-center gap-2 font-body text-sm text-foreground"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              {h}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Pilates = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const benefitsRef = useRef(null);
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background">
      {/* Back nav */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate("/")}
        className="fixed left-6 top-6 z-50 flex items-center gap-2 rounded-full glass-card px-4 py-2 font-body text-sm text-foreground transition-all hover:border-primary/50 md:left-12"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </motion.button>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <video
            src={pilatesHeroVideo}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        </div>

        <div className="absolute left-[10%] top-[30%] h-64 w-64 rounded-full bg-warm-rose/8 blur-[100px] orb-float" />
        <div className="absolute right-[20%] top-[50%] h-48 w-48 rounded-full bg-primary/10 blur-[80px] orb-float-delayed" />

        <div className="relative flex min-h-[80vh] items-end pb-24">
          <div className="section-padding w-full max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="max-w-2xl"
            >
              <p className="mb-6 font-body text-sm tracking-[0.3em] text-primary">
                COPPAHANDGOLD PILATES
              </p>
              <h1 className="mb-8 font-display text-5xl font-bold leading-[1.1] md:text-7xl">
                Rebuild Your Body
                <br />
                <span className="glow-text">From the Core</span>
              </h1>
              <p className="max-w-lg font-body text-lg leading-relaxed text-muted-foreground">
                Chair, reformer & mat Pilates — designed in structured programs 
                so you can clearly see your progressions. From beginner to advanced, 
                every class builds on the last.
              </p>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent breathing" />
      </section>

      {/* Benefits */}
      <section className="section-padding pt-28 lg:pt-40">
        <div className="mx-auto max-w-7xl" ref={benefitsRef}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <p className="mb-4 font-body text-sm tracking-[0.3em] text-primary">
              THE SCIENCE
            </p>
            <h2 className="mx-auto max-w-xl font-display text-4xl font-bold md:text-5xl">
              Why Pilates <span className="glow-text">heals</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-muted-foreground">
              Backed by clinical research, Pilates is one of the most effective movement systems 
              for managing chronic conditions, restoring mobility, and building resilient, 
              pain-free bodies.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <BenefitCard key={benefit.title} benefit={benefit} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Pilates Types */}
      <section className="section-padding pt-28 lg:pt-40 relative">
        <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <p className="mb-4 font-body text-sm tracking-[0.3em] text-primary">
              THE PRACTICE
            </p>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Three ways to <span className="glow-text">move</span>
            </h2>
          </motion.div>

          <div className="space-y-24">
            {pilatesTypes.map((type, i) => (
              <PilatesTypeSection
                key={type.title}
                type={type}
                index={i}
                reversed={i % 2 !== 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute left-1/4 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-60 w-60 rounded-full bg-warm-rose/5 blur-[100px]" />

        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-6 font-display text-4xl font-bold md:text-5xl">
              Ready to start your{" "}
              <span className="glow-text">Pilates journey</span>?
            </h2>
            <p className="mb-10 font-body text-base leading-relaxed text-muted-foreground">
              Experience Pilates at our upcoming tennis & wellness event — 
              March 28th & 29th, 2026 in Abuja. Limited spots available.
            </p>
            <a
              href="/#rsvp"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-4 font-body text-sm font-semibold tracking-wide text-primary-foreground transition-all duration-500 hover:shadow-[0_0_40px_hsl(165_80%_45%/0.4)]"
            >
              <span className="relative z-10">Reserve Your Spot</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 px-6 py-12 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-display text-lg font-bold tracking-wider">
            <span className="glow-text">COPPAHANDGOLD</span>
          </p>
          <p className="font-body text-xs text-muted-foreground">
            © 2026 CoppahandGold. Abuja, Nigeria. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Pilates;
