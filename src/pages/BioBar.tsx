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
  { day: "Day One — March 28", time: "4:00 PM – Late", vibe: "Post-match cool-down. Light, refreshing sips to ease you into the evening." },
  { day: "Day Two — March 29", time: "7:00 AM – 10:00 AM", vibe: "Morning wake-up. Warm brews and fresh tonics to start the day right." },
];

const drinks = [
  {
    name: "Rosebud Lemonade",
    category: "REFRESH",
    tagColor: "text-warm-rose",
    tagBorder: "border-warm-rose/30 bg-warm-rose/5",
    description:
      "Dried rosebuds steeped in hot water, cooled down and mixed with fresh lemon juice, raw honey, and a splash of sparkling water. Floral, light, and genuinely refreshing — the kind of drink that makes you close your eyes and exhale.",
    ingredients: [
      { name: "Dried Rosebuds", amount: "1 tbsp steeped", note: "Mildly calming, rich in Vitamin C, and traditionally used to ease tension and support skin health" },
      { name: "Fresh Lemon Juice", amount: "½ lemon", note: "Alkalising, aids digestion, and adds a bright citrus backbone" },
      { name: "Raw Honey", amount: "1 tbsp", note: "Natural sweetener with antibacterial properties — much gentler than refined sugar" },
      { name: "Sparkling Water", amount: "150ml", note: "Adds fizz and makes it feel like a proper occasion" },
    ],
    icon: Heart,
  },
  {
    name: "Lemongrass Ginger Brew",
    category: "ENERGY",
    tagColor: "text-[hsl(var(--bio-cyan))]",
    tagBorder: "border-[hsl(var(--bio-cyan)/0.3)] bg-[hsl(var(--bio-cyan)/0.05)]",
    description:
      "Fresh lemongrass stalks simmered with sliced ginger root, sweetened with a touch of honey and served warm or over ice. A simple, aromatic drink that wakes up your senses and settles your stomach — perfect for Day Two mornings.",
    ingredients: [
      { name: "Fresh Lemongrass", amount: "2 stalks, bruised", note: "Citrusy and aromatic — traditionally used to aid digestion, reduce bloating, and calm nerves" },
      { name: "Fresh Ginger Root", amount: "1-inch knob, sliced", note: "Warming, anti-nausea, and helps reduce inflammation after physical activity" },
      { name: "Raw Honey", amount: "1 tsp", note: "Rounds out the sharp ginger and adds natural enzymes" },
      { name: "Hot or Iced Water", amount: "250ml", note: "Served your way — warm for mornings, iced for afternoons" },
    ],
    icon: Zap,
  },
  {
    name: "Chamomile Calm",
    category: "WIND DOWN",
    tagColor: "text-[hsl(var(--warm-sand))]",
    tagBorder: "border-[hsl(var(--warm-sand)/0.3)] bg-[hsl(var(--warm-sand)/0.05)]",
    description:
      "Whole chamomile flowers steeped with a cinnamon stick and a slice of fresh orange. Gentle, golden, and designed for the evening — after the matches, after the movement, when it's time to just sit and breathe.",
    ingredients: [
      { name: "Dried Chamomile Flowers", amount: "2 tbsp", note: "One of the oldest calming herbs — eases anxiety, promotes sleep, and soothes the digestive tract" },
      { name: "Cinnamon Stick", amount: "1 stick", note: "Adds warmth and helps regulate blood sugar after a long active day" },
      { name: "Fresh Orange Slice", amount: "2 rounds", note: "Natural sweetness, Vitamin C, and a lovely citrus aroma" },
      { name: "Raw Honey (optional)", amount: "1 tsp", note: "For those who like it a touch sweeter" },
    ],
    icon: Sparkles,
  },
  {
    name: "Aloe Mint Cooler",
    category: "GUT HEALTH",
    tagColor: "text-[hsl(var(--bio-green))]",
    tagBorder: "border-[hsl(var(--bio-green)/0.3)] bg-[hsl(var(--bio-green)/0.05)]",
    description:
      "Fresh aloe vera gel scooped straight from the leaf, blended with cucumber, fresh mint, and lime juice. Clean, cooling, and incredibly hydrating — your gut will thank you.",
    ingredients: [
      { name: "Fresh Aloe Vera Gel", amount: "2 tbsp", note: "Soothes the gut lining, reduces bloating, and supports hydration from the inside out" },
      { name: "Cucumber", amount: "¼ cucumber, blended", note: "92% water, naturally cooling, and packed with silica for skin and joint health" },
      { name: "Fresh Mint Leaves", amount: "6-8 leaves", note: "Opens up the airways, freshens the palate, and aids digestion" },
      { name: "Fresh Lime Juice", amount: "½ lime", note: "Bright acidity that ties everything together and adds Vitamin C" },
    ],
    icon: Leaf,
  },
  {
    name: "Hibiscus Zobo",
    category: "RECOVERY",
    tagColor: "text-primary",
    tagBorder: "border-primary/30 bg-primary/5",
    description:
      "The classic Nigerian zobo — dried hibiscus flowers boiled with cloves, ginger, and a pinch of black pepper, then chilled and sweetened with pineapple juice. Deep red, tangy, and packed with natural compounds that help your body recover after hours of play.",
    ingredients: [
      { name: "Dried Hibiscus Flowers", amount: "3 tbsp boiled", note: "Rich in antioxidants and anthocyanins — naturally lowers blood pressure and reduces muscle soreness" },
      { name: "Whole Cloves & Black Pepper", amount: "3 cloves + pinch", note: "Cloves are anti-inflammatory; black pepper boosts absorption of everything else" },
      { name: "Fresh Ginger", amount: "½-inch knob", note: "Adds a spicy kick and supports digestion" },
      { name: "Pineapple Juice", amount: "100ml", note: "Natural sweetener loaded with bromelain — an enzyme that helps reduce swelling and aids recovery" },
    ],
    icon: Droplets,
  },
  {
    name: "Turmeric Golden Milk",
    category: "RESTORE",
    tagColor: "text-[hsl(280,70%,70%)]",
    tagBorder: "border-[hsl(280,70%,70%,0.3)] bg-[hsl(280,70%,70%,0.05)]",
    description:
      "Warm milk (dairy or oat) infused with fresh turmeric root, a crack of black pepper, cinnamon, and a drizzle of honey. An ancient Ayurvedic recipe that soothes inflammation, calms the nervous system, and tastes like a warm hug. Best served on Day One evening.",
    ingredients: [
      { name: "Fresh Turmeric Root", amount: "1-inch knob, grated", note: "Contains curcumin — a powerful natural anti-inflammatory used for thousands of years" },
      { name: "Black Pepper", amount: "1 crack", note: "Increases curcumin absorption by up to 2,000% — tiny but essential" },
      { name: "Cinnamon & Honey", amount: "½ tsp + 1 tbsp", note: "Cinnamon regulates blood sugar; honey adds sweetness and antimicrobial benefits" },
      { name: "Warm Milk (Dairy or Oat)", amount: "200ml", note: "Creamy base that makes this feel like dessert — choose what suits you" },
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
                <span className="glow-text">Real Drinks</span>
              </h1>
              <p className="max-w-lg font-body text-lg leading-relaxed text-muted-foreground">
                No lab coats. No complicated science. Just fresh herbs — lemongrass,
                chamomile, hibiscus, aloe, turmeric — mixed with everyday ingredients
                into drinks that taste incredible and actually make you feel good.
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
              Keep it <span className="glow-text">simple</span>
            </h2>
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              Every drink at the Bio Bar is made from herbs and ingredients you
              already know — things your grandmother used, things you can find at
              any local market. Lemongrass, ginger, hibiscus, chamomile, aloe vera,
              turmeric. We steep them, blend them, and mix them with honey, lime,
              mint, and fresh fruit. That's it. No mystery powders, no fancy
              extracts, no supplements. Just plants and intention.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {[
                "Fresh Herbs",
                "Market Ingredients",
                "Made On-Site",
                "Event Exclusive",
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
