import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import heroImg from "@/assets/home-hero.jpg";
import moveImg from "@/assets/home-move.jpg";
import connectImg from "@/assets/home-connect.jpg";
import experienceImg from "@/assets/home-experience.jpg";
import portraitImg from "@/assets/home-portrait.jpg";

/* ── animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.18, ease: "easeOut" as const },
  }),
};

/* ── pillar data ── */
const pillars = [
  {
    label: "MOVE",
    headline: "Physical experiences that feel like discovery.",
    image: moveImg,
  },
  {
    label: "CONNECT",
    headline: "Rooms designed around the quality of the women in them.",
    image: connectImg,
  },
  {
    label: "EXPERIENCE",
    headline: "Unexpected combinations. Unexpected places. Unexpected versions of yourself.",
    image: experienceImg,
  },
];

/* ── reusable section observer ── */
const useSectionInView = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, inView };
};

/* ────────────────────────────────────────── */
/*  HOME PAGE                                 */
/* ────────────────────────────────────────── */
const Home = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("rsvp_submissions").insert({
        first_name: "Waitlist",
        last_name: "Subscriber",
        email,
      });
      if (error) throw error;
      toast({ title: "You're on the list.", description: "We'll be in touch." });
      setEmail("");
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ─── HERO ─── */}
      <HeroSection />

      {/* ─── MANIFESTO ─── */}
      <ManifestoStrip />

      {/* ─── THREE PILLARS ─── */}
      <PillarsSection />

      {/* ─── WHO THIS IS FOR ─── */}
      <WhoSection />

      {/* ─── WAITLIST ─── */}
      <WaitlistSection
        email={email}
        setEmail={setEmail}
        loading={loading}
        onSubmit={handleWaitlist}
      />

      <Footer />
    </div>
  );
};

/* ────────────────────────────────────────── */
/*  HERO                                      */
/* ────────────────────────────────────────── */
const HeroSection = () => (
  <section className="relative min-h-screen overflow-hidden">
    {/* bg image */}
    <div className="absolute inset-0">
      <img src={heroImg} alt="Cinematic corridor" className="h-full w-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-background/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
    </div>

    {/* floating orbs */}
    <div className="absolute left-[10%] top-[25%] h-72 w-72 rounded-full bg-primary/8 blur-[120px] orb-float" />
    <div className="absolute right-[10%] bottom-[20%] h-56 w-56 rounded-full bg-warm-rose/6 blur-[100px] orb-float-delayed" />

    {/* content – left aligned */}
    <div className="relative flex min-h-screen items-end pb-24 md:items-center md:pb-0">
      <div className="section-padding mx-auto w-full max-w-7xl">
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.h1
            variants={fadeUp}
            custom={0}
            className="font-display text-5xl font-bold leading-[1.05] md:text-7xl lg:text-8xl"
            style={{ color: "hsl(35 30% 90%)" }}
          >
            Some rooms
            <br />
            change you.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={1}
            className="mt-6 font-body text-lg text-muted-foreground md:text-xl"
          >
            We curate the ones worth being in.
          </motion.p>

          <motion.div variants={fadeUp} custom={2} className="mt-10 flex flex-col items-start gap-4">
            <a
              href="#waitlist"
              className="inline-block rounded-full border border-primary/60 px-8 py-4 font-body text-sm font-semibold tracking-wide text-primary transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_hsl(var(--primary)/0.25)]"
            >
              Join the Waitlist
            </a>
            <a
              href="#manifesto"
              className="font-body text-sm tracking-wide text-muted-foreground transition-colors hover:text-primary"
            >
              Explore the World ↓
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>

    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent breathing" />
  </section>
);

/* ────────────────────────────────────────── */
/*  MANIFESTO STRIP                           */
/* ────────────────────────────────────────── */
const ManifestoStrip = () => {
  const { ref, inView } = useSectionInView();
  return (
    <section
      id="manifesto"
      ref={ref}
      className="relative overflow-hidden px-6 py-28 md:py-40"
      style={{
        background:
          "linear-gradient(135deg, hsl(200 20% 4%) 0%, hsl(350 60% 72% / 0.06) 50%, hsl(200 20% 4%) 100%)",
      }}
    >
      {/* teal rules */}
      <div className="mx-auto mb-12 h-px max-w-3xl bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.4 }}
        className="mx-auto max-w-4xl text-center font-display text-2xl font-semibold italic leading-relaxed md:text-3xl lg:text-4xl"
        style={{ color: "hsl(35 30% 90%)" }}
      >
        "We don't sell experiences. We architect the moments women carry with them."
      </motion.p>

      <div className="mx-auto mt-12 h-px max-w-3xl bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </section>
  );
};

/* ────────────────────────────────────────── */
/*  PILLARS                                   */
/* ────────────────────────────────────────── */
const PillarsSection = () => {
  const { ref, inView } = useSectionInView();
  return (
    <section ref={ref} className="section-padding">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="mb-4 font-body text-sm tracking-[0.3em] text-primary">THE WORLD</p>
          <h2 className="max-w-lg font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Three pillars of <span className="glow-text">CoppahandGold</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.label}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background from-15% via-background/70 via-50% to-background/30" />
              </div>

              {/* hover glow border */}
              <div className="absolute inset-0 rounded-2xl border border-border/30 transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-[0_0_40px_hsl(var(--primary)/0.12)]" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="mb-3 inline-block rounded-full border border-primary/30 px-3 py-1 font-body text-xs tracking-[0.2em] text-primary">
                  {p.label}
                </span>
                <p className="font-display text-lg font-semibold leading-relaxed md:text-xl" style={{ color: "hsl(35 30% 90%)" }}>
                  {p.headline}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ────────────────────────────────────────── */
/*  WHO THIS IS FOR — cinematic split         */
/* ────────────────────────────────────────── */
const WhoSection = () => {
  const { ref, inView } = useSectionInView();
  const lines = [
    "She has taste and uses it.",
    "She invests in experiences over things.",
    "She walks into a room and makes it better.",
    "She's done with ordinary — not because she's difficult, but because she's aware.",
  ];

  return (
    <section ref={ref} className="section-padding">
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-16">
        {/* image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
          className="relative aspect-[3/4] overflow-hidden rounded-2xl"
        >
          <img
            src={portraitImg}
            alt="Editorial portrait"
            loading="lazy"
            width={800}
            height={1000}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/40" />
        </motion.div>

        {/* text */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {lines.map((line, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              custom={i}
              className="mb-4 font-display text-xl font-semibold leading-relaxed md:text-2xl lg:text-3xl"
              style={{ color: "hsl(35 30% 90%)" }}
            >
              {line}
            </motion.p>
          ))}
          <motion.p
            variants={fadeUp}
            custom={lines.length}
            className="mt-6 font-display text-xl font-semibold text-primary md:text-2xl lg:text-3xl"
          >
            This is where she belongs.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

/* ────────────────────────────────────────── */
/*  WAITLIST                                  */
/* ────────────────────────────────────────── */
const WaitlistSection = ({
  email,
  setEmail,
  loading,
  onSubmit,
}: {
  email: string;
  setEmail: (v: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) => {
  const { ref, inView } = useSectionInView();
  return (
    <section id="waitlist" ref={ref} className="relative overflow-hidden px-6 py-28 md:py-36">
      {/* teal edge glow */}
      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-primary/5 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-primary/5 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-xl text-center"
      >
        <h2
          className="font-display text-4xl font-bold md:text-5xl"
          style={{ color: "hsl(35 30% 90%)" }}
        >
          Be first in the room.
        </h2>
        <p className="mt-4 font-body text-muted-foreground">
          CoppahandGold experiences are limited by design. The waitlist is how you stay ahead.
        </p>

        <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <input
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-full border border-border bg-card px-6 py-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-primary px-8 py-4 font-body text-sm font-semibold tracking-wide text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.35)] disabled:opacity-50"
          >
            {loading ? "Securing…" : "Secure My Place"}
          </button>
        </form>

        <p className="mt-4 font-body text-xs text-muted-foreground">
          No noise. Just the rooms worth knowing about.
        </p>
      </motion.div>
    </section>
  );
};

export default Home;
