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
  TreePine,
  Clock,
  Shield,
  Sun,
} from "lucide-react";
import bioBarHeroImg from "@/assets/biobar-hero.jpg";

const schedule = [
  { day: "Day One — March 28", time: "4:00 PM – Late", vibe: "Post-match wind-down. Recovery elixirs, social sipping, slow conversations." },
  { day: "Day Two — March 29", time: "7:00 AM – 10:00 AM", vibe: "Morning activation. Pre-court energisers, adaptogenic coffees, and gut-priming tonics." },
];

const drinks = [
  {
    name: "Golden Mind",
    category: "FOCUS",
    tagColor: "text-primary",
    tagBorder: "border-primary/30 bg-primary/5",
    description:
      "A warm, earthy blend built around lion's mane mushroom and gotu kola — two herbs traditionally used across Asia and Africa to sharpen memory and calm scattered thinking. Mixed with oat milk, raw honey, and a pinch of cinnamon for a drink that tastes like a spiced latte but works like a clarity reset.",
    ingredients: [
      { name: "Lion's Mane Mushroom", amount: "1 tsp dried powder", note: "Traditionally used in Chinese medicine to support nerve health and mental clarity" },
      { name: "Gotu Kola Leaves", amount: "½ tsp extract", note: "Ayurvedic herb known as 'the student's herb' — supports concentration and calm" },
      { name: "Raw Honey & Cinnamon", amount: "1 tbsp + pinch", note: "Natural sweetener with antimicrobial properties; cinnamon balances blood sugar" },
      { name: "Oat Milk", amount: "200ml", note: "Creamy, fibre-rich base that makes the whole thing feel like a treat" },
    ],
    icon: Brain,
  },
  {
    name: "Hibiscus Recover",
    category: "ANTI-INFLAMMATORY",
    tagColor: "text-warm-rose",
    tagBorder: "border-warm-rose/30 bg-warm-rose/5",
    description:
      "A deep crimson cooler starring dried hibiscus flowers (zobo) and fresh turmeric root — both powerhouse anti-inflammatories you can find in any Nigerian market. Blended with tart cherry juice, fresh ginger, and a squeeze of lime. Tangy, refreshing, and designed to help your muscles bounce back after a long day on court.",
    ingredients: [
      { name: "Dried Hibiscus Flowers (Zobo)", amount: "2 tbsp steeped", note: "Rich in anthocyanins — natural compounds that reduce muscle soreness and lower blood pressure" },
      { name: "Fresh Turmeric Root", amount: "1-inch knob, grated", note: "Contains curcumin, one of nature's strongest anti-inflammatory compounds" },
      { name: "Fresh Ginger Root", amount: "½-inch knob", note: "Warming digestive aid that also reduces exercise-induced inflammation" },
      { name: "Tart Cherry Juice & Lime", amount: "120ml + ½ lime", note: "Tart cherry is clinically shown to reduce muscle pain; lime adds Vitamin C and brightness" },
    ],
    icon: Heart,
  },
  {
    name: "Morning Volt",
    category: "ENERGY",
    tagColor: "text-[hsl(var(--bio-cyan))]",
    tagBorder: "border-[hsl(var(--bio-cyan)/0.3)] bg-[hsl(var(--bio-cyan)/0.05)]",
    description:
      "Skip the coffee crash. Built on moringa leaf — Nigeria's own superfood — blended with ceremonial-grade matcha, fresh coconut water, and a spoonful of baobab powder. Clean, sustained energy that carries you through warm-ups and into competitive play without the jitters.",
    ingredients: [
      { name: "Moringa Leaf Powder", amount: "1 tsp", note: "Packed with iron, B-vitamins, and amino acids — a natural energy booster used across West Africa for centuries" },
      { name: "Ceremonial Matcha", amount: "1 tsp whisked", note: "Slow-release caffeine paired with L-theanine from the tea leaf itself — alert without anxious" },
      { name: "Fresh Coconut Water", amount: "250ml", note: "Nature's electrolyte drink — potassium, magnesium, and sodium in perfect balance" },
      { name: "Baobab Fruit Powder", amount: "1 tbsp", note: "Indigenous African superfruit with 6x more Vitamin C than oranges and natural prebiotic fibre" },
    ],
    icon: Zap,
  },
  {
    name: "Belly Reset",
    category: "GUT HEALTH",
    tagColor: "text-[hsl(var(--bio-green))]",
    tagBorder: "border-[hsl(var(--bio-green)/0.3)] bg-[hsl(var(--bio-green)/0.05)]",
    description:
      "A gentle, tangy tonic built around fermented ginger bug, aloe vera gel, and slippery elm bark — herbs that have been soothing digestive systems for generations. Mixed with green apple juice and a dash of raw apple cider vinegar. Tastes clean, slightly fizzy, and leaves your gut feeling genuinely calm.",
    ingredients: [
      { name: "Ginger Bug (Fermented)", amount: "60ml", note: "A naturally fermented ginger starter — full of live probiotics and digestive enzymes" },
      { name: "Fresh Aloe Vera Gel", amount: "2 tbsp", note: "Soothes the gut lining, reduces bloating, and supports nutrient absorption" },
      { name: "Slippery Elm Bark Powder", amount: "1 tsp", note: "A traditional remedy that coats and protects the intestinal wall — deeply soothing" },
      { name: "Green Apple Juice & ACV", amount: "100ml + 1 tbsp", note: "Green apple adds natural sweetness; raw apple cider vinegar kickstarts digestive enzymes" },
    ],
    icon: Leaf,
  },
  {
    name: "Cacao Ceremony",
    category: "HEART OPENING",
    tagColor: "text-[hsl(280,70%,70%)]",
    tagBorder: "border-[hsl(280,70%,70%,0.3)] bg-[hsl(280,70%,70%,0.05)]",
    description:
      "Rooted in ancient Mesoamerican tradition. Ceremonial-grade cacao is gently heated with ashwagandha root, a pinch of cayenne, and vanilla bean — creating a rich, velvety drink that opens the chest, deepens breathing, and brings you into a calm, present state. The drink you have when you want to slow down and feel everything.",
    ingredients: [
      { name: "Ceremonial Cacao (100% paste)", amount: "20g melted", note: "Unprocessed cacao rich in theobromine — a gentle heart stimulant that lifts mood without caffeine spikes" },
      { name: "Ashwagandha Root Powder", amount: "1 tsp", note: "An Ayurvedic adaptogen that lowers cortisol, eases anxiety, and supports restful presence" },
      { name: "Cayenne Pepper & Vanilla Bean", amount: "tiny pinch + ½ bean", note: "Cayenne stimulates circulation; vanilla grounds the flavour and calms the nervous system" },
      { name: "Warm Oat Milk & Raw Honey", amount: "200ml + 1 tsp", note: "Creamy, naturally sweet base — the honey adds enzymes and the oat milk rounds out the richness" },
    ],
    icon: Sparkles,
  },
  {
    name: "Sunrise Tonic",
    category: "VITALITY",
    tagColor: "text-[hsl(var(--warm-sand))]",
    tagBorder: "border-[hsl(var(--warm-sand)/0.3)] bg-[hsl(var(--warm-sand)/0.05)]",
    description:
      "A bright, citrus-forward tonic built around bitter leaf extract and lemongrass — two herbs deeply rooted in Nigerian herbalism. Mixed with fresh orange juice, a knob of turmeric, and sparkling water. Sharp, alive, and designed to wake up every cell in your body on Day Two morning.",
    ingredients: [
      { name: "Bitter Leaf Extract", amount: "½ tsp", note: "Used across West Africa for liver support, detoxification, and metabolic activation" },
      { name: "Fresh Lemongrass", amount: "2 stalks steeped", note: "Aromatic, citrusy herb that aids digestion, reduces anxiety, and has natural antimicrobial properties" },
      { name: "Fresh Orange & Turmeric", amount: "1 orange + 1-inch root", note: "Vitamin C meets curcumin — a pairing that boosts iron absorption and fights oxidative stress" },
      { name: "Sparkling Water & Mint", amount: "150ml + fresh leaves", note: "Effervescence makes it refreshing; mint opens airways and aids digestion" },
    ],
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

        <div className="space-y-3">
          <p className="flex items-center gap-2 font-body text-xs tracking-[0.15em] text-foreground/60">
            <TreePine className="h-3.5 w-3.5" />
            WHAT'S IN IT
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
                {ing.amount}
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
              Herbs first, <span className="glow-text">always</span>
            </h2>
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              Everything we serve starts with real plants — roots, leaves, bark,
              and fruit that have been used for generations across West Africa,
              Ayurveda, and traditional Chinese herbalism. We mix them with
              simple, everyday ingredients like coconut water, raw honey, fresh
              citrus, and oat milk to create drinks that taste incredible and
              actually do something. No synthetic isolates. No lab-coat theatre.
              Just herbs, prepared with intention, and served with transparency.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {[
                "Real Herbs & Roots",
                "Locally Sourced",
                "Simple Ingredients",
                "Full Transparency",
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
              Six herbal blends — each built around real plants mixed with
              everyday ingredients you'd find in any kitchen. We tell you
              exactly what's in each glass and why it's there.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {drinks.map((drink, i) => (
              <DrinkCard key={drink.name} drink={drink} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Cacao Note */}
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
                A Note on the Cacao Ceremony
              </h3>
            </div>
            <div className="space-y-4 font-body text-sm leading-relaxed text-muted-foreground">
              <p>
                Ceremonial cacao is not the same as cocoa powder. It's
                minimally processed, stone-ground cacao paste — rich in
                theobromine, a gentle heart stimulant that ancient
                Mesoamerican cultures used in sacred rituals. Combined with
                ashwagandha (a root used for millennia in Ayurvedic medicine
                to reduce stress) and a touch of cayenne to open circulation,
                it creates a deeply grounding experience.
              </p>
              <p>
                This isn't about getting "high" — it's about slowing down,
                breathing deeper, and arriving fully into your body. Think of
                it as the opposite of a shot of espresso: warmth instead of
                speed, presence instead of productivity.
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
