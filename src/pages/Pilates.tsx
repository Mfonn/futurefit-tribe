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

      {/* Before Your First Class - FAQ Accordion */}
      <section className="section-padding pt-28 lg:pt-40 relative">
        <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <p className="mb-4 font-body text-sm tracking-[0.3em] text-primary">
              BEFORE YOUR FIRST CLASS
            </p>
            <h2 className="mb-4 font-display text-4xl font-bold md:text-5xl">
              Everything you <span className="glow-text">need to know</span>
            </h2>
            <p className="mx-auto max-w-2xl font-body text-base text-muted-foreground">
              Never done Pilates before? Perfect. Here's everything to help you
              walk in feeling confident.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="what-to-wear" className="glass-card border-border/30 rounded-xl px-6 overflow-hidden">
                <AccordionTrigger className="font-display text-base font-semibold hover:no-underline gap-4">
                  <div className="flex items-center gap-3 text-left">
                    <Shirt className="h-5 w-5 text-primary shrink-0" />
                    What should I wear?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm leading-relaxed text-muted-foreground">
                  <p className="mb-3">Comfortable, form-fitting clothes that let you move freely. Think leggings, a fitted top, and bare feet (socks with grip are fine too). Avoid loose or baggy clothing — your instructor needs to see your alignment to guide you properly.</p>
                  <div className="flex flex-wrap gap-2">
                    {["Leggings or fitted joggers", "Sports bra or fitted top", "Bare feet or grip socks", "Hair tied back"].map(tip => (
                      <span key={tip} className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs text-primary">
                        <CheckCircle2 className="h-3 w-3" /> {tip}
                      </span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="what-to-bring" className="glass-card border-border/30 rounded-xl px-6 overflow-hidden">
                <AccordionTrigger className="font-display text-base font-semibold hover:no-underline gap-4">
                  <div className="flex items-center gap-3 text-left">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    What do I need to bring?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm leading-relaxed text-muted-foreground">
                  <p className="mb-3">Just yourself and water. We provide mats and all equipment. If you have a personal yoga mat you love, feel free to bring it — but it's completely optional.</p>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="flex items-start gap-2 rounded-lg border border-primary/15 bg-primary/5 p-3">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <div><p className="text-xs font-medium text-foreground">Water bottle</p><p className="text-xs text-muted-foreground">Stay hydrated — you'll sweat more than you expect</p></div>
                    </div>
                    <div className="flex items-start gap-2 rounded-lg border border-primary/15 bg-primary/5 p-3">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <div><p className="text-xs font-medium text-foreground">Small towel</p><p className="text-xs text-muted-foreground">Optional but handy for wiping down</p></div>
                    </div>
                    <div className="flex items-start gap-2 rounded-lg border border-primary/15 bg-primary/5 p-3">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <div><p className="text-xs font-medium text-foreground">Open mind</p><p className="text-xs text-muted-foreground">Seriously — that's the most important thing</p></div>
                    </div>
                    <div className="flex items-start gap-2 rounded-lg border border-border/20 bg-background/50 p-3">
                      <AlertCircle className="h-4 w-4 text-warm-rose shrink-0 mt-0.5" />
                      <div><p className="text-xs font-medium text-foreground">Don't eat heavy</p><p className="text-xs text-muted-foreground">A light snack is fine — a full meal 2 hours before is not</p></div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="fitness-level" className="glass-card border-border/30 rounded-xl px-6 overflow-hidden">
                <AccordionTrigger className="font-display text-base font-semibold hover:no-underline gap-4">
                  <div className="flex items-center gap-3 text-left">
                    <Users className="h-5 w-5 text-primary shrink-0" />
                    Do I need to be fit to do Pilates?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm leading-relaxed text-muted-foreground">
                  <p>Absolutely not. Pilates was originally designed for rehabilitation — Joseph Pilates created it to help injured soldiers recover. Every exercise has modifications, and our instructors will adapt movements to your level in real time. Whether you're an athlete or haven't exercised in years, you'll find your place on the mat.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="expect-first" className="glass-card border-border/30 rounded-xl px-6 overflow-hidden">
                <AccordionTrigger className="font-display text-base font-semibold hover:no-underline gap-4">
                  <div className="flex items-center gap-3 text-left">
                    <Eye className="h-5 w-5 text-primary shrink-0" />
                    What will my first class feel like?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm leading-relaxed text-muted-foreground">
                  <div className="space-y-4">
                    <p>Expect to feel muscles you didn't know existed — especially deep in your core, inner thighs, and along your spine. The movements look small but the burn is real. You'll also spend more time on breathing than you expect — that's by design.</p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        { time: "First 10 min", desc: "Warm-up, breathing exercises, and alignment check" },
                        { time: "Middle 30 min", desc: "Core-focused sequences with increasing intensity" },
                        { time: "Final 10 min", desc: "Cool-down stretches and full-body relaxation" },
                      ].map(phase => (
                        <div key={phase.time} className="rounded-lg border border-border/30 bg-background/50 p-4 text-center">
                          <p className="font-display text-sm font-bold text-primary">{phase.time}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{phase.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="injuries" className="glass-card border-border/30 rounded-xl px-6 overflow-hidden">
                <AccordionTrigger className="font-display text-base font-semibold hover:no-underline gap-4">
                  <div className="flex items-center gap-3 text-left">
                    <AlertCircle className="h-5 w-5 text-warm-rose shrink-0" />
                    What if I have an injury or chronic condition?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm leading-relaxed text-muted-foreground">
                  <p>Tell your instructor before the session starts. Pilates is actually one of the most recommended modalities for managing chronic conditions like osteoarthritis, lower back pain, and postpartum recovery. Your instructor will offer modified positions and may adjust the sequence so you get the benefit without the risk.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="pilates-vs-yoga" className="glass-card border-border/30 rounded-xl px-6 overflow-hidden">
                <AccordionTrigger className="font-display text-base font-semibold hover:no-underline gap-4">
                  <div className="flex items-center gap-3 text-left">
                    <Sparkles className="h-5 w-5 text-primary shrink-0" />
                    What's the difference between Pilates and Yoga?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm leading-relaxed text-muted-foreground">
                  <div className="grid gap-4 sm:grid-cols-2 mt-2">
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                      <h4 className="font-display text-sm font-bold text-primary mb-2">Pilates</h4>
                      <ul className="space-y-2 text-xs">
                        <li className="flex gap-2"><span className="text-primary">→</span> Focus on core strength and spinal alignment</li>
                        <li className="flex gap-2"><span className="text-primary">→</span> Precise, controlled movements</li>
                        <li className="flex gap-2"><span className="text-primary">→</span> Lateral thoracic breathing</li>
                        <li className="flex gap-2"><span className="text-primary">→</span> Created by Joseph Pilates in the 1920s</li>
                        <li className="flex gap-2"><span className="text-primary">→</span> Builds strength from the inside out</li>
                      </ul>
                    </div>
                    <div className="rounded-xl border border-warm-rose/20 bg-warm-rose/5 p-5">
                      <h4 className="font-display text-sm font-bold text-warm-rose mb-2">Yoga</h4>
                      <ul className="space-y-2 text-xs">
                        <li className="flex gap-2"><span className="text-warm-rose">→</span> Focus on flexibility, balance, and breath</li>
                        <li className="flex gap-2"><span className="text-warm-rose">→</span> Flowing or held postures</li>
                        <li className="flex gap-2"><span className="text-warm-rose">→</span> Pranayama (diaphragmatic breathing)</li>
                        <li className="flex gap-2"><span className="text-warm-rose">→</span> Thousands of years old, rooted in Indian tradition</li>
                        <li className="flex gap-2"><span className="text-warm-rose">→</span> Integrates body, mind, and spirit</li>
                      </ul>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-center text-muted-foreground italic">At this event, we combine both — Pilates core activation followed by yoga stretches for a complete experience.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* The Pilates System - Interactive Tabs */}
      <section className="section-padding pt-28 lg:pt-40 relative">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <p className="mb-4 font-body text-sm tracking-[0.3em] text-primary">
              UNDERSTAND THE SYSTEM
            </p>
            <h2 className="mb-4 font-display text-4xl font-bold md:text-5xl">
              The Pilates <span className="glow-text">apparatus</span>
            </h2>
            <p className="mx-auto max-w-2xl font-body text-base text-muted-foreground">
              At the event you'll experience mat Pilates — but our educational sessions will introduce
              you to the full Pilates system. Here's a preview of the three core formats.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Tabs defaultValue="mat" className="w-full">
              <TabsList className="w-full flex h-auto bg-card border border-border/30 rounded-xl p-1.5 gap-1">
                <TabsTrigger value="mat" className="flex-1 rounded-lg py-3 font-display text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_0_20px_hsl(165_80%_45%/0.3)]">
                  Mat
                </TabsTrigger>
                <TabsTrigger value="reformer" className="flex-1 rounded-lg py-3 font-display text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_0_20px_hsl(165_80%_45%/0.3)]">
                  Reformer
                </TabsTrigger>
                <TabsTrigger value="chair" className="flex-1 rounded-lg py-3 font-display text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_0_20px_hsl(165_80%_45%/0.3)]">
                  Wunda Chair
                </TabsTrigger>
              </TabsList>

              <TabsContent value="mat" className="mt-8">
                <div className="grid gap-8 lg:grid-cols-2 items-center">
                  <div className="overflow-hidden rounded-2xl">
                    <img src={pilatesMatImg} alt="Mat Pilates" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <span className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-body text-xs tracking-[0.2em] text-primary">
                      YOUR EVENT EXPERIENCE
                    </span>
                    <h3 className="mt-3 mb-4 font-display text-3xl font-bold">Mat Pilates</h3>
                    <p className="mb-6 font-body text-sm leading-relaxed text-muted-foreground">
                      The foundation of the entire Pilates system. Everything starts here — on a mat, with your body weight,
                      learning to activate your deep core muscles (what Joseph Pilates called the "powerhouse"). Mat work
                      teaches you the principles before you ever touch a machine.
                    </p>
                    <div className="space-y-3">
                      <h4 className="font-display text-sm font-semibold text-foreground">Key principles you'll learn:</h4>
                      {[
                        { title: "Centering", desc: "All movement starts from your core — the band of muscles between your ribs and hips" },
                        { title: "Concentration", desc: "Every movement is intentional — you think before you move" },
                        { title: "Control", desc: "No momentum, no swinging — slow, precise muscle engagement" },
                        { title: "Precision", desc: "Alignment matters — an inch in the wrong direction changes everything" },
                        { title: "Breath", desc: "Lateral thoracic breathing — expand your ribs sideways, not your belly" },
                        { title: "Flow", desc: "Movements connect seamlessly into each other, like a conversation" },
                      ].map((p) => (
                        <div key={p.title} className="flex items-start gap-3 rounded-lg border border-border/30 bg-background/50 p-3">
                          <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="font-body text-sm font-medium text-foreground">{p.title}</p>
                            <p className="text-xs text-muted-foreground">{p.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reformer" className="mt-8">
                <div className="grid gap-8 lg:grid-cols-2 items-center">
                  <div className="overflow-hidden rounded-2xl">
                    <img src={pilatesReformerImg} alt="Reformer Pilates" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <span className="mb-3 inline-block rounded-full border border-warm-rose/30 bg-warm-rose/5 px-3 py-1 font-body text-xs tracking-[0.2em] text-warm-rose">
                      EDUCATIONAL SESSION
                    </span>
                    <h3 className="mt-3 mb-4 font-display text-3xl font-bold">The Reformer</h3>
                    <p className="mb-6 font-body text-sm leading-relaxed text-muted-foreground">
                      The most recognised Pilates machine. A sliding carriage on rails, connected to springs of
                      varying resistance. You push, pull, and stabilise against the spring tension — working muscles
                      in ways that mat work alone can't reach.
                    </p>
                    <div className="space-y-3">
                      <h4 className="font-display text-sm font-semibold text-foreground">Parts of the Reformer:</h4>
                      {[
                        { title: "Carriage", desc: "The sliding platform you sit, lie, or stand on — it moves along the frame" },
                        { title: "Springs", desc: "Colour-coded by resistance (light to heavy) — they create the challenge" },
                        { title: "Footbar", desc: "The bar at the front — you push against it with your feet or hands" },
                        { title: "Straps & Ropes", desc: "Attached to the carriage — used for arm and leg exercises while lying down" },
                        { title: "Headrest", desc: "Adjustable rest that supports your neck — can be raised or lowered" },
                        { title: "Shoulder Blocks", desc: "Keep you from sliding off during pushing exercises" },
                      ].map((part) => (
                        <div key={part.title} className="flex items-start gap-3 rounded-lg border border-border/30 bg-background/50 p-3">
                          <Dumbbell className="h-4 w-4 text-warm-rose shrink-0 mt-0.5" />
                          <div>
                            <p className="font-body text-sm font-medium text-foreground">{part.title}</p>
                            <p className="text-xs text-muted-foreground">{part.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="chair" className="mt-8">
                <div className="grid gap-8 lg:grid-cols-2 items-center">
                  <div className="overflow-hidden rounded-2xl">
                    <img src={pilatesChairImg} alt="Wunda Chair" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <span className="mb-3 inline-block rounded-full border border-warm-rose/30 bg-warm-rose/5 px-3 py-1 font-body text-xs tracking-[0.2em] text-warm-rose">
                      EDUCATIONAL SESSION
                    </span>
                    <h3 className="mt-3 mb-4 font-display text-3xl font-bold">The Wunda Chair</h3>
                    <p className="mb-6 font-body text-sm leading-relaxed text-muted-foreground">
                      Don't let the size fool you — the Wunda Chair is one of the most challenging Pilates apparatus.
                      A small box with a spring-loaded pedal that you press down with your hands or feet. It demands
                      serious balance, coordination, and deep core engagement.
                    </p>
                    <div className="space-y-3">
                      <h4 className="font-display text-sm font-semibold text-foreground">Parts of the Wunda Chair:</h4>
                      {[
                        { title: "Seat", desc: "The padded top where you sit or place your hands — your stable base" },
                        { title: "Pedal", desc: "The spring-loaded lever you press down — this is where all the work happens" },
                        { title: "Springs", desc: "Usually 2 springs with multiple hook positions — controls resistance level" },
                        { title: "Handles (optional)", desc: "Some models have side handles for balance during standing exercises" },
                      ].map((part) => (
                        <div key={part.title} className="flex items-start gap-3 rounded-lg border border-border/30 bg-background/50 p-3">
                          <Dumbbell className="h-4 w-4 text-warm-rose shrink-0 mt-0.5" />
                          <div>
                            <p className="font-body text-sm font-medium text-foreground">{part.title}</p>
                            <p className="text-xs text-muted-foreground">{part.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
                      <p className="font-body text-xs leading-relaxed text-muted-foreground">
                        <span className="font-semibold text-primary">Why it matters:</span> The chair builds
                        the kind of functional strength that translates directly to daily life — standing balance,
                        single-leg stability, and the deep stabilizer muscles that protect your joints.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Progression Path */}
      <section className="section-padding pt-28 lg:pt-40">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <p className="mb-4 font-body text-sm tracking-[0.3em] text-primary">
              YOUR JOURNEY
            </p>
            <h2 className="mb-4 font-display text-4xl font-bold md:text-5xl">
              The progression <span className="glow-text">path</span>
            </h2>
            <p className="mx-auto max-w-2xl font-body text-base text-muted-foreground">
              Pilates is a program, not a random class. Here's how the system is designed to take you
              from beginner to advanced — and how this event fits into that journey.
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent md:left-1/2" />

            {[
              {
                stage: "Stage 1",
                title: "Mat Fundamentals",
                desc: "Learn the 6 principles. Master breathing. Build core awareness. This is where everyone starts — and it's what you'll experience at the event.",
                tag: "AT THIS EVENT",
                tagStyle: "border-primary/30 bg-primary/5 text-primary",
              },
              {
                stage: "Stage 2",
                title: "Mat Intermediate",
                desc: "Longer sequences, deeper engagement, exercises like the Hundred, Roll Up, and Single Leg Circle become second nature. Your body starts to change.",
                tag: "POST-EVENT PROGRAM",
                tagStyle: "border-border/30 bg-background/50 text-muted-foreground",
              },
              {
                stage: "Stage 3",
                title: "Reformer Introduction",
                desc: "You bring your mat skills onto the machine. The springs add resistance and assistance — revealing imbalances and building strength in a completely new way.",
                tag: "POST-EVENT PROGRAM",
                tagStyle: "border-border/30 bg-background/50 text-muted-foreground",
              },
              {
                stage: "Stage 4",
                title: "Chair & Advanced Work",
                desc: "Standing exercises, single-leg work, and full-body integration on the Wunda Chair. This is where Pilates becomes genuinely transformative for daily life.",
                tag: "POST-EVENT PROGRAM",
                tagStyle: "border-border/30 bg-background/50 text-muted-foreground",
              },
            ].map((step, i) => (
              <motion.div
                key={step.stage}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative mb-12 flex items-start gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:gap-16`}
              >
                {/* Dot */}
                <div className="absolute left-6 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_12px_hsl(165_80%_45%/0.5)] md:left-1/2" />

                <div className={`ml-14 glass-card p-6 md:ml-0 md:w-[calc(50%-2rem)] ${i === 0 ? "border-primary/30" : ""}`}>
                  <span className={`mb-2 inline-block rounded-full border px-2.5 py-1 font-body text-[10px] tracking-[0.2em] ${step.tagStyle}`}>
                    {step.tag}
                  </span>
                  <p className="mt-1 font-body text-xs text-primary">{step.stage}</p>
                  <h4 className="mt-1 font-display text-lg font-bold">{step.title}</h4>
                  <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
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
              CoppahandGold tennis & wellness event. March 27th & 28th, 2026 in Abuja.
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
