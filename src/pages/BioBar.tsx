import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Leaf,
  Zap,
  Brain,
  Heart,
  Sparkles,
  Droplets,
  FlaskConical,
  Clock,
  Shield,
} from "lucide-react";
import bioBarHeroImg from "@/assets/biobar-hero.jpg";

const schedule = [
  { day: "Day One — March 28", time: "4:00 PM – Late", vibe: "Post-match wind-down. Recovery elixirs, social sipping, slow conversations." },
  { day: "Day Two — March 29", time: "7:00 AM – 10:00 AM", vibe: "Morning activation. Pre-court energisers, adaptogenic coffees, and gut-priming tonics." },
];

const drinks = [
  {
    name: "Neural Bloom",
    category: "NOOTROPIC",
    tagColor: "text-primary",
    tagBorder: "border-primary/30 bg-primary/5",
    description:
      "A clarity-first formula designed to sharpen focus and quiet mental noise — without the caffeine crash.",
    ingredients: [
      { name: "Lion's Mane Extract", dose: "500mg", note: "NGF stimulation for neuroplasticity" },
      { name: "Bacopa Monnieri", dose: "300mg", note: "Memory consolidation & retention" },
      { name: "L-Theanine", dose: "200mg", note: "Calm focus without drowsiness" },
      { name: "Ginkgo Biloba", dose: "120mg", note: "Cerebral blood flow optimisation" },
    ],
    icon: Brain,
  },
  {
    name: "Crimson Repair",
    category: "ANTI-INFLAMMATORY",
    tagColor: "text-warm-rose",
    tagBorder: "border-warm-rose/30 bg-warm-rose/5",
    description:
      "Post-match recovery in a glass. Targets systemic inflammation while flooding your cells with antioxidants.",
    ingredients: [
      { name: "Tart Cherry Concentrate", dose: "240ml", note: "Reduces DOMS & uric acid" },
      { name: "Turmeric Curcumin (95%)", dose: "500mg", note: "COX-2 inhibition, joint support" },
      { name: "BioPerine® Black Pepper", dose: "10mg", note: "2000% curcumin bioavailability boost" },
      { name: "Bromelain", dose: "250mg", note: "Proteolytic enzyme for tissue repair" },
    ],
    icon: Heart,
  },
  {
    name: "Volt",
    category: "ENERGY",
    tagColor: "text-[hsl(var(--bio-cyan))]",
    tagBorder: "border-[hsl(var(--bio-cyan)/0.3)] bg-[hsl(var(--bio-cyan)/0.05)]",
    description:
      "Clean, sustained energy with zero jitters. Built for the morning of Day Two when you need to bring intensity to the court.",
    ingredients: [
      { name: "Cordyceps Militaris", dose: "1000mg", note: "ATP production & VO₂ max support" },
      { name: "Green Tea Matcha (Ceremonial)", dose: "2g", note: "Sustained catechin-driven alertness" },
      { name: "Electrolyte Complex (Mg, K, Na)", dose: "600mg", note: "Intracellular hydration" },
      { name: "Rhodiola Rosea", dose: "300mg", note: "Fatigue resistance, stress adaptation" },
    ],
    icon: Zap,
  },
  {
    name: "Gut Genesis",
    category: "MICROBIOME",
    tagColor: "text-[hsl(var(--bio-green))]",
    tagBorder: "border-[hsl(var(--bio-green)/0.3)] bg-[hsl(var(--bio-green)/0.05)]",
    description:
      "A living elixir designed to repopulate your gut flora and strengthen the mucosal barrier — your first line of immune defence.",
    ingredients: [
      { name: "Multi-Strain Probiotic", dose: "50 Billion CFU", note: "Lactobacillus & Bifidobacterium blend" },
      { name: "L-Glutamine", dose: "5g", note: "Intestinal lining repair" },
      { name: "Slippery Elm Bark", dose: "400mg", note: "Mucosal coating & GI soothing" },
      { name: "Apple Cider Vinegar (Raw)", dose: "15ml", note: "Digestive enzyme activation" },
    ],
    icon: Leaf,
  },
  {
    name: "Lucid Dream",
    category: "PSYCHEDELIC MICRODOSE",
    tagColor: "text-[hsl(280,70%,70%)]",
    tagBorder: "border-[hsl(280,70%,70%,0.3)] bg-[hsl(280,70%,70%,0.05)]",
    description:
      "A sub-perceptual microdose protocol paired with synergistic botanicals. Designed to expand creativity, deepen presence, and dissolve the ego's grip — safely and intentionally.",
    ingredients: [
      { name: "Psilocybin Microdose", dose: "100μg", note: "Sub-perceptual — no hallucination, enhanced openness" },
      { name: "Niacin (Flush)", dose: "100mg", note: "Stamets Stack — drives neurogenesis to periphery" },
      { name: "Lion's Mane Extract", dose: "500mg", note: "Synergistic NGF potentiation" },
      { name: "Cacao Ceremonial Grade", dose: "15g", note: "Theobromine-driven heart opening" },
    ],
    icon: Sparkles,
    disclaimer: "Administered under pharmacist supervision. Available by consultation only. Not suitable for all guests.",
  },
  {
    name: "Cellular Reset",
    category: "LONGEVITY",
    tagColor: "text-[hsl(var(--warm-sand))]",
    tagBorder: "border-[hsl(var(--warm-sand)/0.3)] bg-[hsl(var(--warm-sand)/0.05)]",
    description:
      "An NAD+ precursor blend targeting mitochondrial efficiency and cellular repair — the foundation of biological age reversal.",
    ingredients: [
      { name: "NMN (β-Nicotinamide Mononucleotide)", dose: "250mg", note: "NAD+ precursor, sirtuin activation" },
      { name: "Trans-Resveratrol", dose: "200mg", note: "Sirtuin co-activator, antioxidant" },
      { name: "CoQ10 (Ubiquinol)", dose: "100mg", note: "Mitochondrial electron transport" },
      { name: "Astaxanthin", dose: "12mg", note: "6000x more potent than Vitamin C" },
    ],
    icon: Shield,
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

        <div className="space-y-3">
          <p className="flex items-center gap-2 font-body text-xs tracking-[0.15em] text-foreground/60">
            <FlaskConical className="h-3.5 w-3.5" />
            FORMULATION
          </p>
          {drink.ingredients.map((ing) => (
            <div
              key={ing.name}
              className="flex items-start justify-between gap-4 rounded-lg border border-border/30 bg-background/50 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="font-body text-sm font-medium text-foreground">
                  {ing.name}
                </p>
                <p className="mt-0.5 font-body text-xs text-muted-foreground">
                  {ing.note}
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 font-body text-xs font-medium text-primary">
                {ing.dose}
              </span>
            </div>
          ))}
        </div>

        {drink.disclaimer && (
          <div className="mt-5 flex items-start gap-2 rounded-lg border border-warm-rose/20 bg-warm-rose/5 px-4 py-3">
            <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warm-rose" />
            <p className="font-body text-xs leading-relaxed text-warm-rose/80">
              {drink.disclaimer}
            </p>
          </div>
        )}
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
            alt="Bio Bar — Pharmacist-Curated Elixirs"
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
                Science You
                <br />
                <span className="glow-text">Can Sip</span>
              </h1>
              <p className="max-w-lg font-body text-lg leading-relaxed text-muted-foreground">
                A pharmacist-curated bar blending adaptogenic herbs, electrolyte
                complexes, nootropics, and botanical extracts into drinks that
                target inflammation, energy, neurogenesis, and cellular repair.
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
              Not a <span className="glow-text">juice bar</span>
            </h2>
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              Every formula is designed by a licensed pharmacist with clinical
              dosing, bioavailability-optimised delivery, and ingredients sourced
              for potency — not marketing. We list every compound, every dose,
              and the science behind why it's there. No proprietary blends. No
              pixie-dusting. No guesswork.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {[
                "Clinical Dosing",
                "Pharmacist-Formulated",
                "Full Transparency",
                "Bioavailability-Optimised",
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
              Six pharmacist-designed formulations — each targeting a specific
              biological system. Full ingredient transparency, clinical dosing,
              and the reasoning behind every compound.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {drinks.map((drink, i) => (
              <DrinkCard key={drink.name} drink={drink} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Psychedelic Disclaimer */}
      <section className="section-padding pt-20 lg:pt-28">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card border-[hsl(280,70%,70%,0.2)] p-8 md:p-12"
          >
            <div className="mb-4 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-[hsl(280,70%,70%)]" />
              <h3 className="font-display text-xl font-bold">
                A Note on Psychedelic Microdosing
              </h3>
            </div>
            <div className="space-y-4 font-body text-sm leading-relaxed text-muted-foreground">
              <p>
                Our Lucid Dream formulation uses a sub-perceptual psilocybin
                microdose based on the Stamets Stack protocol — a framework
                developed by mycologist Paul Stamets combining psilocybin,
                lion's mane, and niacin for neurogenesis without psychoactive
                effects.
              </p>
              <p>
                At 100μg, you won't feel "high." What the research suggests is
                enhanced neuroplasticity, improved pattern recognition, reduced
                default mode network activity (linked to rumination and anxiety),
                and a gentle expansion of present-moment awareness.
              </p>
              <p>
                This formulation is <strong className="text-foreground">consultation-only</strong>. 
                Our pharmacist will walk you through contraindications, current
                medications, and personal suitability before any serving. It is
                not available to all guests and will be administered in a
                controlled, supervised setting.
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
              Drink with <span className="glow-text">intention</span>
            </h2>
            <p className="mb-10 font-body text-base leading-relaxed text-muted-foreground">
              The Bio Bar is part of the full CoppahandGold experience.
              March 28th & 29th, 2026 in Abuja. Every sip is included.
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
