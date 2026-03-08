import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Leaf, Brain, Bone, Wind, Sparkles, Users, BookOpen, Dumbbell, CheckCircle2, AlertCircle, Shirt, Clock, Eye, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import pilatesHeroImg from "@/assets/pilates-hero.jpg";
import pilatesChairImg from "@/assets/pilates-chair.jpg";
import pilatesReformerImg from "@/assets/pilates-reformer.jpg";
import pilatesMatImg from "@/assets/pilates-mat.jpg";
import yogaImg from "@/assets/yoga.jpg";

const eventHighlights = [
  {
    icon: Users,
    title: "Expert-Led Sessions",
    description:
      "Every mat Pilates and yoga sequence is guided by certified instructors who tailor cues to all levels — whether you're touching a mat for the first time or deepening an existing practice.",
  },
  {
    icon: Brain,
    title: "Nervous System Reset",
    description:
      "The combination of controlled Pilates breathing and yoga's parasympathetic activation shifts your body out of fight-or-flight — lowering cortisol and restoring calm in real time.",
  },
  {
    icon: Leaf,
    title: "Curated Movement Pairings",
    description:
      "Each session is intentionally sequenced: Pilates core activation followed by yoga stretches that release and lengthen — so your body experiences both strength and surrender.",
  },
  {
    icon: Wind,
    title: "Breath as Medicine",
    description:
      "Lateral thoracic breathing from Pilates meets pranayama from yoga — together they expand lung capacity, sharpen focus, and create a deep sense of presence.",
  },
  {
    icon: Sparkles,
    title: "Mind-Body Integration",
    description:
      "Every movement demands precision and awareness. You'll leave with a renewed connection between your mind and body — not just a workout, but a reset.",
  },
  {
    icon: Bone,
    title: "Accessible to Every Body",
    description:
      "Modifications for every pose and exercise mean nobody is left behind. Whether you're managing chronic pain, postpartum recovery, or simply new to movement — you belong here.",
  },
];

const educationalSections = [
  {
    title: "Wunda Chair",
    level: "Educational Session",
    image: pilatesChairImg,
    description:
      "In our educational sessions, you'll learn about the Wunda chair — a compact, spring-loaded apparatus that challenges deep stabilizer muscles and builds functional power. Our instructors will break down how structured chair programs can transform core strength and postural alignment, giving you a clear picture of what a deeper Pilates practice looks like.",
    highlights: ["How it works", "Core science explained", "Progression pathways", "Q&A with instructors"],
  },
  {
    title: "Reformer Pilates",
    level: "Educational Session",
    image: pilatesReformerImg,
    description:
      "The reformer is the crown jewel of Pilates apparatus. Through our educational sessions, you'll understand how adjustable spring resistance on a sliding carriage creates a full-body workout that lengthens, strengthens, and sculpts — and why a structured reformer program is one of the most effective tools for long-term body transformation.",
    highlights: ["How it works", "Benefits breakdown", "Program structure", "Instructor-led Q&A"],
  },
  {
    title: "Mat Pilates & Yoga",
    level: "Your Event Experience",
    image: yogaImg,
    description:
      "This is what you'll practice at the event. Mat Pilates builds incredible core strength using your own body weight, while yoga sequences open your hips, lengthen your spine, and quiet your mind. Together, they create the perfect complement to the competitive energy of the tennis courts.",
    highlights: ["All-levels welcome", "Outdoor setting", "Expert guidance", "Full-body restoration"],
  },
];

const HighlightCard = ({ item, index }: { item: (typeof eventHighlights)[0]; index: number }) => {
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
      <item.icon className="mb-4 h-6 w-6 text-primary" />
      <h3 className="mb-2 font-display text-lg font-semibold">{item.title}</h3>
      <p className="font-body text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
    </motion.div>
  );
};

const EducationalSection = ({
  section,
  reversed,
}: {
  section: (typeof educationalSections)[0];
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
            src={section.image}
            alt={section.title}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>

      <div className={reversed ? "lg:[direction:ltr]" : ""}>
        <span className="mb-3 inline-block rounded-full border border-warm-rose/30 bg-warm-rose/5 px-3 py-1 font-body text-xs tracking-[0.2em] text-warm-rose">
          {section.level}
        </span>
        <h3 className="mb-4 font-display text-3xl font-bold md:text-4xl">
          {section.title}
        </h3>
        <p className="mb-6 font-body text-base leading-relaxed text-muted-foreground">
          {section.description}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {section.highlights.map((h) => (
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
  const highlightsRef = useRef(null);
  const highlightsInView = useInView(highlightsRef, { once: true, margin: "-100px" });

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
            src={pilatesHeroImg}
            alt="Mat Pilates & Yoga"
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
                MAT PILATES & YOGA AT THE EVENT
              </p>
              <h1 className="mb-8 font-display text-5xl font-bold leading-[1.1] md:text-7xl">
                Move. Breathe.
                <br />
                <span className="glow-text">Restore.</span>
              </h1>
              <p className="max-w-lg font-body text-lg leading-relaxed text-muted-foreground">
                Expert-guided mat Pilates and yoga sessions woven into the fabric 
                of the event — designed to ground your body, calm your mind, and 
                complement the electric energy of the courts.
              </p>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent breathing" />
      </section>

      {/* What to Expect */}
      <section className="section-padding pt-28 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 max-w-3xl"
          >
            <p className="mb-4 font-body text-sm tracking-[0.3em] text-primary">
              YOUR EXPERIENCE
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold md:text-5xl">
              Why we paired <span className="glow-text">Pilates & yoga</span>
            </h2>
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              This isn't a random add-on. Every movement session at CoppahandGold is 
              curated to work with the full event — competitive tennis on one end, 
              intentional restoration on the other. Mat Pilates strengthens your core 
              and sharpens your body awareness. Yoga opens your joints, lengthens your 
              muscles, and quiets the noise. Together, they create a wellness experience 
              that leaves you feeling genuinely different when you walk away.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section-padding pt-8 lg:pt-12">
        <div className="mx-auto max-w-7xl" ref={highlightsRef}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={highlightsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <p className="mb-4 font-body text-sm tracking-[0.3em] text-primary">
              THE DETAILS
            </p>
            <h2 className="mx-auto max-w-xl font-display text-4xl font-bold md:text-5xl">
              What makes it <span className="glow-text">different</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {eventHighlights.map((item, i) => (
              <HighlightCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Educational Sessions + Equipment Showcase */}
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
              <BookOpen className="h-4 w-4 text-primary" />
              <p className="font-body text-sm tracking-[0.3em] text-primary">
                LEARN & DISCOVER
              </p>
            </div>
            <h2 className="mb-4 font-display text-4xl font-bold md:text-5xl">
              Beyond the <span className="glow-text">mat</span>
            </h2>
            <p className="mx-auto max-w-2xl font-body text-base text-muted-foreground">
              Alongside your movement sessions, we're hosting educational sessions on 
              advanced Pilates disciplines — so you can understand how a deeper practice 
              works, explore the science behind each method, and discover pathways to 
              continue your journey beyond the event.
            </p>
          </motion.div>

          <div className="space-y-32">
            {educationalSections.map((section, i) => (
              <EducationalSection
                key={section.title}
                section={section}
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
              Ready to experience{" "}
              <span className="glow-text">movement that matters</span>?
            </h2>
            <p className="mb-10 font-body text-base leading-relaxed text-muted-foreground">
              Mat Pilates, yoga, educational demos, and more — all part of the 
              CoppahandGold tennis & wellness event. March 28th & 29th, 2026 in Abuja.
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
