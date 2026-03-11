import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Beaker, Leaf, Sparkles, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import aboutHeroImg from "@/assets/about-hero.jpg";
import biobarDrinkImg from "@/assets/biobar-drink.jpg";

/* ── Animated counter ── */
const AnimatedNumber = ({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setValue(Math.round(current * 10) / 10);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}{value % 1 === 0 ? Math.round(value) : value.toFixed(1)}{suffix}
    </span>
  );
};

/* ── Animated bar ── */
const AnimatedBar = ({ percentage, delay }: { percentage: number; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="h-2 w-full overflow-hidden rounded-full bg-secondary">
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${percentage}%` } : {}}
        transition={{ duration: 1.5, delay, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ background: "var(--gradient-bio)" }}
      />
    </div>
  );
};

const stats = [
  {
    value: 72,
    suffix: "%",
    label: "of travelers seek wellness-focused accommodations",
    source: "Google / Booking.com Travel Report",
    bar: 72,
  },
  {
    value: 55,
    suffix: "%",
    label: "increase in Pilates studio searches near hotels",
    source: "Google Trends, 2024–2026",
    bar: 55,
  },
  {
    prefix: "$",
    value: 1.3,
    suffix: "T",
    label: "projected wellness tourism market by 2025",
    source: "Global Wellness Institute",
    bar: 85,
  },
  {
    value: 68,
    suffix: "%",
    label: "of business travelers report jet lag impacts on performance",
    source: "Sleep Foundation / Google Health",
    bar: 68,
  },
];

const values = [
  {
    icon: Beaker,
    title: "Science-Driven",
    description: "Every experience is rooted in evidence-based research — from bio-engineered elixirs to recovery protocols designed by wellness scientists.",
  },
  {
    icon: Leaf,
    title: "Holistic Wellness",
    description: "We address the full spectrum of human performance: sleep quality, posture correction, stress response, and nutritional optimization.",
  },
  {
    icon: Sparkles,
    title: "Sustainable Luxury",
    description: "Premium doesn't mean wasteful. Our ingredients are organic, our practices are regenerative, and our impact is intentional.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[70vh] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img src={aboutHeroImg} alt="Serene wellness retreat" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        </div>
        <div className="absolute left-[10%] top-[30%] h-48 w-48 rounded-full bg-primary/10 blur-[80px] orb-float" />

        <div className="relative section-padding w-full max-w-7xl mx-auto pb-16">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-4 font-body text-sm tracking-[0.3em] text-primary"
          >
            ABOUT US
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-6 font-display text-4xl font-bold leading-[1.1] md:text-6xl lg:text-7xl"
          >
            Redefining Wellness
            <br />
            <span className="glow-text">in Hospitality</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-lg font-body text-lg text-muted-foreground"
          >
            Where science meets serenity.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent breathing" />
      </section>

      {/* ═══════ OUR STORY ═══════ */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-3 font-body text-sm tracking-[0.2em] text-primary">OUR STORY</p>
            <h2 className="mb-8 font-display text-3xl font-bold md:text-4xl">
              The Future of <span className="glow-text">Feeling Good</span>
            </h2>
            <div className="space-y-6 font-body text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                CoppahandGold was born from a simple observation: the hospitality industry was
                missing the mark on wellness. Hotels offered spas, but rarely science. Resorts
                promised relaxation, but seldom results. We set out to change that.
              </p>
              <p>
                We integrate evidence-based wellness practices — from circadian-aligned sleep
                protocols and posture-corrective movement to bio-engineered nutrition — into the
                fabric of luxury hospitality. Every experience we design addresses real challenges
                travelers face: jet lag disruption, sedentary fatigue, nutritional gaps, and the
                quiet toll of constant motion.
              </p>
              <p>
                Our approach fuses clinical research with sensory indulgence, creating
                transformative experiences that don't just pamper — they perform. Whether it's a
                mat Pilates session calibrated for recovery, a yoga flow designed to reset your
                nervous system, or a biobar elixir formulated for cognitive clarity — everything
                we do is intentional, measurable, and unforgettable.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ KEY STATISTICS ═══════ */}
      <section className="section-padding bg-secondary/30">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <p className="mb-3 font-body text-sm tracking-[0.2em] text-primary">THE DATA</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Why Wellness <span className="glow-text">Matters Now</span>
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="glass-card p-8"
              >
                <div className="mb-4 font-display text-4xl font-bold text-primary md:text-5xl">
                  <AnimatedNumber
                    target={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix || ""}
                  />
                </div>
                <p className="mb-4 font-body text-sm text-foreground md:text-base">{stat.label}</p>
                <AnimatedBar percentage={stat.bar} delay={i * 0.15 + 0.3} />
                <p className="mt-3 font-body text-xs text-muted-foreground italic">
                  Source: {stat.source}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ THE BIOBAR CONCEPT ═══════ */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="mb-3 font-body text-sm tracking-[0.2em] text-primary">THE BIOBAR</p>
              <h2 className="mb-6 font-display text-3xl font-bold md:text-4xl">
                Science You Can <span className="glow-text">Sip</span>
              </h2>
              <div className="space-y-4 font-body text-base leading-relaxed text-muted-foreground md:text-lg">
                <p>
                  The Biobar is our signature alternative to the traditional hotel bar — a space
                  where organic, nutrient-rich cocktails replace empty calories, and adaptogen
                  elixirs replace the afternoon espresso crash.
                </p>
                <p>
                  Every drink on the menu is formulated with purpose: cold-pressed juices for
                  cellular hydration, herbal infusions for nervous system recovery, and
                  superfood blends calibrated to your body's circadian rhythm.
                </p>
                <p className="inline-block rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm text-primary">
                  ✦ Sip mindfully with our science-backed concoctions
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={biobarDrinkImg}
                  alt="Biobar adaptogen elixir"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-primary/15 blur-[60px]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ OUR VALUES ═══════ */}
      <section className="section-padding bg-secondary/20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <p className="mb-3 font-body text-sm tracking-[0.2em] text-primary">OUR APPROACH</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Built on <span className="glow-text">Intention</span>
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="glass-card p-8 text-center"
              >
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <v.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 font-display text-xl font-semibold">{v.title}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
