import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Trophy, Zap, Music, Coffee, Target } from "lucide-react";
import heroImg from "@/assets/hero-tennis.jpg";

const dayOne = [
  {
    icon: Users,
    title: "Meet & Connect",
    description:
      "Arrive, settle in, and meet fellow participants. No pressure, no scorecards — just genuine introductions and good energy.",
  },
  {
    icon: Coffee,
    title: "Court Walkthrough",
    description:
      "Get familiar with the premium courts, explore the venue, and soak in the atmosphere. Coaches walk you through the setup so nothing feels foreign on day two.",
  },
  {
    icon: Music,
    title: "Mock Rallies & Light Play",
    description:
      "Casual, zero-stakes rallies under the lights. Hit a few balls, laugh at the misses, find your rhythm — this is about feeling the racket in your hand, not winning.",
  },
  {
    icon: Zap,
    title: "Evening Social",
    description:
      "Wind down at the Bio Bar with curated elixirs. Light chit-chat, new friendships, and the kind of relaxed conversations that make the next day feel like you're playing with friends.",
  },
];

const dayTwo = [
  {
    icon: Target,
    title: "Warm-Up & Coaching",
    description:
      "Structured warm-up led by our coaches — footwork drills, serve practice, and tactical tips tailored to your level. Whether you're a beginner or seasoned, you'll feel prepared.",
  },
  {
    icon: Trophy,
    title: "Competitive Play",
    description:
      "The main event. Organised matches on premium courts under lights. Singles, doubles, and mixed formats — real competition with real energy, cheered on by the community you built yesterday.",
  },
  {
    icon: Users,
    title: "Community & Celebration",
    description:
      "Post-match cool-down, recovery at the Bio Bar, and a celebration of every rally, every point, and every connection made over two unforgettable days.",
  },
];

const EventCard = ({
  item,
  index,
}: {
  item: { icon: any; title: string; description: string };
  index: number;
}) => {
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

const Tennis = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const dayOneRef = useRef(null);
  const dayOneInView = useInView(dayOneRef, { once: true, margin: "-100px" });
  const dayTwoRef = useRef(null);
  const dayTwoInView = useInView(dayTwoRef, { once: true, margin: "-100px" });

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
            src={heroImg}
            alt="Tennis under lights at CoppahandGold"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        </div>

        <div className="absolute left-[10%] top-[30%] h-64 w-64 rounded-full bg-primary/10 blur-[100px] orb-float" />
        <div className="absolute right-[20%] top-[50%] h-48 w-48 rounded-full bg-bio-teal/10 blur-[80px] orb-float-delayed" />

        <div className="relative flex min-h-[80vh] items-end pb-24">
          <div className="section-padding w-full max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="max-w-2xl"
            >
              <p className="mb-6 font-body text-sm tracking-[0.3em] text-primary">
                COPPAHANDGOLD TENNIS
              </p>
              <h1 className="mb-8 font-display text-5xl font-bold leading-[1.1] md:text-7xl">
                Rally Under
                <br />
                <span className="glow-text">the Lights</span>
              </h1>
              <p className="max-w-lg font-body text-lg leading-relaxed text-muted-foreground">
                Two days on premium courts in Abuja. Day one is about connection — 
                meeting your people, finding your rhythm, and settling into the experience. 
                Day two is where it all comes alive with competitive play, real matches, 
                and the energy of a community that's already bonded.
              </p>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent breathing" />
      </section>

      {/* Intro */}
      <section className="section-padding pt-28 lg:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-4 font-body text-sm tracking-[0.3em] text-primary">
              THE FORMAT
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold md:text-5xl">
              Built for <span className="glow-text">everyone</span>
            </h2>
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              Whether you're a seasoned player or picking up a racket for the first time, 
              this isn't a tournament you walk into cold. Our coaches guide you through an 
              electrifying two-day experience — the first day eases you in, the second day 
              brings the heat. By the time you step on court for your first real match, 
              you'll already know the people beside you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Day One */}
      <section className="section-padding pt-28 lg:pt-40">
        <div className="mx-auto max-w-7xl" ref={dayOneRef}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={dayOneInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 font-body text-xs tracking-[0.2em] text-primary">
              MARCH 28, 2026
            </span>
            <h2 className="mt-6 font-display text-4xl font-bold md:text-5xl">
              Day One — <span className="glow-text">Connect</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-muted-foreground">
              Zero pressure. No scores. Just an intentional space for you to arrive, breathe, 
              and meet the people who'll be on the other side of the net tomorrow. Think of it 
              as the warm-up before the warm-up.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {dayOne.map((item, i) => (
              <EventCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Day Two */}
      <section className="section-padding pt-28 lg:pt-40 relative">
        <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="mx-auto max-w-7xl" ref={dayTwoRef}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={dayTwoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <span className="mb-4 inline-block rounded-full border border-warm-rose/30 bg-warm-rose/5 px-4 py-1.5 font-body text-xs tracking-[0.2em] text-warm-rose">
              MARCH 29, 2026
            </span>
            <h2 className="mt-6 font-display text-4xl font-bold md:text-5xl">
              Day Two — <span className="glow-text">Compete</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-muted-foreground">
              This is what you came for. Real matches on premium courts, under lights, 
              with coaches in your corner and a community cheering you on. Every level plays — 
              from first-timers to club players.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3">
            {dayTwo.map((item, i) => (
              <EventCard key={item.title} item={item} index={i} />
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
              Ready to step on{" "}
              <span className="glow-text">court</span>?
            </h2>
            <p className="mb-10 font-body text-base leading-relaxed text-muted-foreground">
              Two days. Premium courts. A community that plays hard and welcomes harder. 
              March 28–29, 2026 in Abuja. Limited spots.
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

export default Tennis;
