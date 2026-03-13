import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Leaf,
  Zap,
  Heart,
  Sparkles,
  Droplets,
  Clock,
  Sun,
} from "lucide-react";
import bioBarHeroImg from "@/assets/biobar-hero.jpg";

const schedule = [
  { day: "Day One — March 27", time: "4:00 PM – Late", vibe: "Post-match cool-down. Light, refreshing sips to ease you into the evening." },
  { day: "Day Two — March 28", time: "7:00 AM – 10:00 AM", vibe: "Morning wake-up. Warm brews and fresh tonics to start the day right." },
];

const drinks = [
  {
    name: "The Bloom",
    category: "REFRESH",
    tagColor: "text-warm-rose",
    tagBorder: "border-warm-rose/30 bg-warm-rose/5",
    description:
      "Floral. Sparkling. Deceptively light. One sip and the afternoon heat becomes a memory. What's in it? Petals, citrus, and a few things we're keeping to ourselves.",
    highlights: ["Calming", "Vitamin C boost", "Naturally sparkling"],
    icon: Heart,
  },
  {
    name: "Morning Signal",
    category: "ENERGY",
    tagColor: "text-[hsl(var(--bio-cyan))]",
    tagBorder: "border-[hsl(var(--bio-cyan)/0.3)] bg-[hsl(var(--bio-cyan)/0.05)]",
    description:
      "The one that wakes you up before the coffee does. Aromatic, warming, and sharp — it settles the stomach and sharpens your edge for Day Two. Your body will know.",
    highlights: ["Digestive support", "Anti-inflammatory", "Morning energy"],
    icon: Zap,
  },
  {
    name: "Golden Hour",
    category: "WIND DOWN",
    tagColor: "text-[hsl(var(--warm-sand))]",
    tagBorder: "border-[hsl(var(--warm-sand)/0.3)] bg-[hsl(var(--warm-sand)/0.05)]",
    description:
      "Named after the moment it's meant for. After the matches, after the movement — this golden elixir tells your nervous system the day is done. Breathe out.",
    highlights: ["Eases tension", "Promotes restful sleep", "Soothes digestion"],
    icon: Sparkles,
  },
  {
    name: "The Reset",
    category: "GUT HEALTH",
    tagColor: "text-[hsl(var(--bio-green))]",
    tagBorder: "border-[hsl(var(--bio-green)/0.3)] bg-[hsl(var(--bio-green)/0.05)]",
    description:
      "Clean. Cool. Like pressing a button your body didn't know it had. Deeply hydrating and impossibly refreshing — your gut thanks you, your skin notices.",
    highlights: ["Gut-soothing", "Deep hydration", "Cooling effect"],
    icon: Leaf,
  },
  {
    name: "Crimson Revival",
    category: "RECOVERY",
    tagColor: "text-primary",
    tagBorder: "border-primary/30 bg-primary/5",
    description:
      "Deep red. Tangy. Ancient. A recipe that's been recovering bodies for centuries — we just made it hit different. After hours of play, this is what brings you back.",
    highlights: ["Rich in antioxidants", "Muscle recovery", "Naturally tangy"],
    icon: Droplets,
  },
  {
    name: "Liquid Gold",
    category: "RESTORE",
    tagColor: "text-[hsl(280,70%,70%)]",
    tagBorder: "border-[hsl(280,70%,70%,0.3)] bg-[hsl(280,70%,70%,0.05)]",
    description:
      "Warm. Creamy. The kind of recipe that gets passed down in whispers. It soothes inflammation from the inside out and tastes like a warm embrace at the end of a long day.",
    highlights: ["Anti-inflammatory", "Calms the nervous system", "Warming"],
    icon: Sun,
  },
];

const DrinkCard = ({ drink, index }: { drink: (typeof drinks)[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="glass-card overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_hsl(165_80%_45%/0.12)]"
    >
      <div className="p-6 md:p-8">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <span
              className={`mb-2 inline-block rounded-full border px-3 py-1 font-body text-[10px] tracking-[0.2em] ${drink.tagColor} ${drink.tagBorder}`}
            >
              {drink.category}
            </span>
            <h3 className="mt-2 font-display text-2xl font-bold">{drink.name}</h3>
          </div>
          <drink.icon className={`h-6 w-6 shrink-0 ${drink.tagColor}`} />
        </div>
        <p className="mb-6 font-body text-sm leading-relaxed text-muted-foreground">
          {drink.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {drink.highlights.map((h) => (
            <span
              key={h}
              className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 font-body text-xs text-primary"
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const BioBar = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

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
          <img
            src={bioBarHeroImg}
            alt="The Bio Bar — Fresh Herbal Drinks"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        </div>

        <div className="absolute left-[10%] top-[30%] h-64 w-64 rounded-full bg-primary/10 blur-[100px] orb-float" />
        <div className="absolute right-[20%] top-[50%] h-48 w-48 rounded-full bg-[hsl(280,70%,70%,0.08)] blur-[80px] orb-float-delayed" />

        <div className="relative flex min-h-[80vh] items-end pb-24">
          <div className="section-padding w-full max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="max-w-2xl"
            >
              <p className="mb-6 font-body text-sm tracking-[0.3em] text-primary">
                THE BIO BAR
              </p>
              <h1 className="mb-8 font-display text-5xl font-bold leading-[1.1] md:text-7xl">
                Simple Herbs,
                <br />
                <span className="glow-text">Real Results</span>
              </h1>
              <p className="max-w-lg font-body text-lg leading-relaxed text-muted-foreground">
                Fresh herbs. Familiar ingredients. Drinks made on-site that taste
                incredible and actually make you feel something. Come taste the
                difference — the recipes stay with us.
              </p>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent breathing" />
      </section>

      {/* Schedule */}
      <section className="section-padding pt-28 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <p className="mb-4 font-body text-sm tracking-[0.3em] text-primary">
              WHEN TO FIND US
            </p>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Two windows, <span className="glow-text">two moods</span>
            </h2>
          </motion.div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {schedule.map((s, i) => (
              <motion.div
                key={s.day}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="glass-card p-8 text-center"
              >
                <span className={`mb-3 inline-block rounded-full border px-4 py-1.5 font-body text-xs tracking-[0.2em] ${i === 0 ? "border-primary/30 bg-primary/5 text-primary" : "border-warm-rose/30 bg-warm-rose/5 text-warm-rose"}`}>
                  {s.day.split("—")[0].trim()}
                </span>
                <p className="mt-4 font-body text-sm text-muted-foreground">
                  {s.day.split("—")[1]?.trim()}
                </p>
                <div className="my-4 flex items-center justify-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <p className="font-display text-2xl font-bold">{s.time}</p>
                </div>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">
                  {s.vibe}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding pt-28 lg:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-4 font-body text-sm tracking-[0.3em] text-primary">
              THE PHILOSOPHY
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold md:text-5xl">
              Herbs you know, <span className="glow-text">results you'll feel</span>
            </h2>
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              Everything at the Bio Bar starts with herbs your grandmother used —
              lemongrass, ginger, hibiscus, chamomile, turmeric, aloe vera. We mix
              them with everyday ingredients into drinks that taste amazing. How we
              blend them, what ratios we use, and the little details that make each
              one hit differently? You'll have to show up to find out.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {[
                "Fresh Herbs",
                "Made On-Site",
                "Event Exclusive",
                "Recipes Stay With Us",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 font-body text-xs tracking-[0.15em] text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Drinks Menu */}
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
            <div className="mb-4 flex items-center justify-center gap-2">
              <Droplets className="h-4 w-4 text-primary" />
              <p className="font-body text-sm tracking-[0.3em] text-primary">
                THE MENU
              </p>
            </div>
            <h2 className="mb-4 font-display text-4xl font-bold md:text-5xl">
              What's <span className="glow-text">on tap</span>
            </h2>
            <p className="mx-auto max-w-2xl font-body text-base text-muted-foreground">
              Six herbal blends — each built around real plants you already know.
              We'll tell you what it does. The recipe? That's ours.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {drinks.map((drink, i) => (
              <DrinkCard key={drink.name} drink={drink} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Event Note */}
      <section className="section-padding pt-20 lg:pt-28">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card border-primary/20 p-8 md:p-12"
          >
            <div className="mb-4 flex items-center gap-3">
              <Leaf className="h-5 w-5 text-primary" />
              <h3 className="font-display text-xl font-bold">
                You Have to Be There
              </h3>
            </div>
            <div className="space-y-4 font-body text-sm leading-relaxed text-muted-foreground">
              <p>
                The Bio Bar is only available during the CoppahandGold event —
                March 27th & 28th, 2026 in Abuja. Every drink is prepared fresh
                on-site. No pre-made mixes, no bottled shortcuts, no recipes shared online.
              </p>
              <p>
                All drinks are complimentary for event attendees. The only way
                to taste them is to be in the room.
              </p>
            </div>
          </motion.div>
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
              Taste it <span className="glow-text">yourself</span>
            </h2>
            <p className="mb-10 font-body text-base leading-relaxed text-muted-foreground">
              The Bio Bar is part of the full CoppahandGold experience.
              March 28th & 29th, 2026 in Abuja. Every sip is included —
              but you have to be there.
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

export default BioBar;
