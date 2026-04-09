import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";
import { useNavigate } from "react-router-dom";

import heroImg from "@/assets/home-hero.jpg";
import moveImg from "@/assets/home-move.jpg";
import connectImg from "@/assets/home-connect.jpg";
import experienceImg from "@/assets/home-experience.jpg";
import portraitImg from "@/assets/home-portrait.jpg";

/* ── colors ── */
const C = {
  black: "#080a09",
  teal: "#00e5c8",
  blush: "#c9847a",
  white: "#f0ede8",
  whiteDim: "rgba(240,237,232,0.55)",
  whiteFaint: "rgba(240,237,232,0.25)",
};

/* ── animation ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay: i * 0.16, ease: "easeOut" as const },
  }),
};

const useSection = (margin = "-80px") => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: margin as any });
  return { ref, inView };
};

/* ── custom cursor ── */
const TealCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);
    let raf: number;
    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (dotRef.current) { dotRef.current.style.left = mx + "px"; dotRef.current.style.top = my + "px"; }
      if (ringRef.current) { ringRef.current.style.left = rx + "px"; ringRef.current.style.top = ry + "px"; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  );
};

/* ── grain overlay ── */
const GrainOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: 0.35 }}>
    <svg width="100%" height="100%">
      <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /></filter>
      <rect width="100%" height="100%" filter="url(#grain)" opacity="0.5" />
    </svg>
  </div>
);

/* ════════════════════════════════════════ */
/*  CALENDAR SLIDE                          */
/* ════════════════════════════════════════ */

type CalEvent = {
  weekStart: number; // day of month the week starts
  weekEnd: number;
  color: string;
  label: string;
};

const MONTHS: { name: string; year: number; month: number; days: number; startDay: number; events: CalEvent[] }[] = [
  {
    name: "April", year: 2025, month: 3, days: 30, startDay: 2, // Tuesday
    events: [
      { weekStart: 21, weekEnd: 27, color: "rgba(236,160,172,0.35)", label: "Cones & Code" }, // bubblegum
    ],
  },
  {
    name: "May", year: 2025, month: 4, days: 31, startDay: 4, // Thursday
    events: [
      { weekStart: 5, weekEnd: 11, color: "rgba(80,200,120,0.3)", label: "Tennis Classic" }, // green
      { weekStart: 19, weekEnd: 25, color: "rgba(160,120,80,0.3)", label: "Sunset Yoga" }, // brown
      { weekStart: 26, weekEnd: 31, color: "rgba(180,190,200,0.28)", label: "Auto Zen" }, // silver
    ],
  },
  {
    name: "June", year: 2025, month: 5, days: 30, startDay: 0, // Sunday
    events: [
      { weekStart: 2, weekEnd: 8, color: "rgba(80,200,120,0.3)", label: "Hyrox Festival" }, // green
    ],
  },
];

const DAY_NAMES = ["S", "M", "T", "W", "T", "F", "S"];

const MiniCalendar = ({ month }: { month: typeof MONTHS[0] }) => {
  const cells: (number | null)[] = [];
  for (let i = 0; i < month.startDay; i++) cells.push(null);
  for (let d = 1; d <= month.days; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const getEventForDay = (day: number | null) => {
    if (!day) return null;
    return month.events.find(e => day >= e.weekStart && day <= e.weekEnd);
  };

  return (
    <div className="flex-1 min-w-[220px]">
      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 300,
        fontStyle: "italic",
        fontSize: "1.4rem",
        color: C.white,
        marginBottom: 16,
        textAlign: "center",
      }}>
        {month.name}
      </h3>
      {/* day headers */}
      <div className="grid grid-cols-7 gap-0 mb-1">
        {DAY_NAMES.map((d, i) => (
          <div key={i} className="text-center" style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            color: C.whiteFaint,
            padding: "4px 0",
          }}>{d}</div>
        ))}
      </div>
      {/* calendar grid */}
      <div className="grid grid-cols-7 gap-0">
        {cells.map((day, i) => {
          const ev = getEventForDay(day);
          return (
            <div
              key={i}
              className="relative flex items-center justify-center"
              style={{
                height: 36,
                background: ev ? ev.color : "transparent",
                borderRadius: day && ev && day === ev.weekStart ? "4px 0 0 4px" : day && ev && day === ev.weekEnd ? "0 4px 4px 0" : 0,
              }}
              title={ev?.label}
            >
              {day && (
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "0.85rem",
                  color: ev ? C.white : C.whiteDim,
                  fontWeight: ev ? 500 : 300,
                }}>
                  {day}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {/* event legend */}
      <div className="mt-3 space-y-1">
        {month.events.map((ev) => (
          <div key={ev.label} className="flex items-center gap-2">
            <div className="w-3 h-2 rounded-sm" style={{ background: ev.color }} />
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", color: C.whiteDim }}>{ev.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CalendarSlide = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center" style={{ background: C.black }}>
      {/* subtle glows */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-warm-rose/[0.08] blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-primary/[0.06] blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-6 md:px-12 w-full max-w-5xl"
      >
        <p style={{
          fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.58rem",
          letterSpacing: "0.32em", textTransform: "uppercase", color: C.teal,
          marginBottom: 16, textAlign: "center",
        }}>
          What's Coming
        </p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
          fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1,
          color: C.white, textAlign: "center", marginBottom: 48,
        }}>
          The rooms <em style={{ color: C.teal }}>ahead.</em>
        </h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center">
          {MONTHS.map((m) => (
            <MiniCalendar key={m.name} month={m} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/experience")}
            className="teal-pulse"
            style={{
              border: `1px solid ${C.teal}`, padding: "14px 36px",
              fontFamily: "'Jost', sans-serif", fontSize: "0.65rem",
              letterSpacing: "0.25em", textTransform: "uppercase",
              color: C.teal, background: "transparent", cursor: "pointer",
            }}
          >
            See What's Coming →
          </button>
        </div>
      </motion.div>
    </section>
  );
};

/* ════════════════════════════════════════ */
/*  HOME PAGE                               */
/* ════════════════════════════════════════ */
const Home = () => {
  return (
    <div className="min-h-screen teal-cursor" style={{ background: C.black, color: C.white }}>
      <TealCursor />
      <GrainOverlay />
      <Navbar />
      <HeroSlideshow />
      <ManifestoStrip />
      <WhoSection />
      <PillarsSection />
      <ValuesSection />
      <OurWhySection />
      <WaitlistSectionFull />
      <Footer />
    </div>
  );
};

/* ════════════════════════════════════════ */
/*  HERO SLIDESHOW                          */
/* ════════════════════════════════════════ */
const HeroSlideshow = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const SLIDE_COUNT = 2;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDE_COUNT);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className="transition-all duration-500"
            style={{
              width: activeSlide === i ? 32 : 8,
              height: 3,
              background: activeSlide === i ? C.teal : "rgba(240,237,232,0.2)",
              border: "none",
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeSlide === 0 && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroContent />
          </motion.div>
        )}
        {activeSlide === 1 && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <CalendarSlide />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ════════════════════════════════════════ */
/*  HERO CONTENT (slide 1)                  */
/* ════════════════════════════════════════ */
const HeroContent = () => (
  <section className="relative min-h-screen overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroImg} alt="" className="h-full w-full object-cover img-mono" />
      <div className="absolute inset-0" style={{ background: `${C.black}99` }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.black}, transparent 50%, ${C.black}66)` }} />
    </div>
    <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-warm-rose/20 blur-[180px]" />
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[150px]" />

    <div className="relative flex min-h-screen items-end">
      <motion.div
        className="px-[clamp(24px,5vw,60px)] pb-[clamp(60px,10vh,100px)] max-w-3xl"
        initial="hidden" animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.18, delayChildren: 0.5 } } }}
      >
        <motion.p variants={fadeUp} custom={0}
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.58rem", letterSpacing: "0.32em", textTransform: "uppercase", color: C.teal }}>
          Circle — A CoppahandGold Experience
        </motion.p>
        <motion.h1 variants={fadeUp} custom={1}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(3.8rem, 7vw, 6.8rem)", lineHeight: 0.95, color: C.white, marginTop: 16 }}>
          Some rooms<br /><em>change you.</em>
        </motion.h1>
        <motion.p variants={fadeUp} custom={2}
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "0.9rem", letterSpacing: "0.08em", color: C.whiteDim, marginTop: 20 }}>
          We curate the ones worth being in.
        </motion.p>
        <motion.div variants={fadeUp} custom={3} className="flex items-center gap-8" style={{ marginTop: 44 }}>
          <a href="#waitlist" className="teal-pulse"
            style={{
              border: `1px solid ${C.teal}`, padding: "14px 36px",
              fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase",
              color: C.teal, textDecoration: "none",
            }}>
            Join the Waitlist
          </a>
          <a href="#manifesto"
            style={{
              fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase",
              color: "rgba(240,237,232,0.3)", textDecoration: "none",
            }}>
            Explore ↓
          </a>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ════════════════════════════════════════ */
/*  MANIFESTO STRIP                         */
/* ════════════════════════════════════════ */
const ManifestoStrip = () => {
  const { ref, inView } = useSection();
  return (
    <section id="manifesto" ref={ref}
      className="relative overflow-hidden border-t border-b border-primary/10"
      style={{ background: C.black, padding: "90px 60px", textAlign: "center" }}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] rounded-full bg-warm-rose/[0.07] blur-[100px]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] rounded-full bg-primary/[0.04] blur-[80px]" />
      </div>
      <motion.p
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1.4 }}
        className="relative mx-auto"
        style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic",
          fontSize: "clamp(1.4rem, 2.6vw, 2.1rem)", lineHeight: 1.5, maxWidth: 760, color: C.white,
        }}>
        "We don't sell experiences. We <span className="text-primary">architect</span> the moments women carry with them."
      </motion.p>
    </section>
  );
};

/* ════════════════════════════════════════ */
/*  WHO THIS IS FOR                         */
/* ════════════════════════════════════════ */
const WhoSection = () => {
  const { ref, inView } = useSection();
  const lines = [
    "She has taste and uses it.",
    "She invests in experiences over things.",
    "She walks into a room and makes it better.",
    "She's done with ordinary — not because she's difficult, but because she's aware.",
  ];

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: C.black }}>
      <div className="grid md:grid-cols-2" style={{ minHeight: 660 }}>
        <div className="relative overflow-hidden" style={{ minHeight: 400 }}>
          <img src={portraitImg} alt="" className="absolute inset-0 w-full h-full object-cover img-mono" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(201,132,122,0.2) 0%, transparent 55%)" }} />
          <div className="absolute inset-0 hidden md:block" style={{ background: `linear-gradient(to right, transparent 65%, ${C.black} 100%)` }} />
          <div className="absolute inset-0 md:hidden" style={{ background: `linear-gradient(to bottom, transparent 60%, ${C.black} 100%)` }} />
        </div>
        <div className="relative flex items-center" style={{ padding: "clamp(40px,6vw,90px) clamp(24px,5vw,70px)" }}>
          <div className="absolute left-0 top-[15%] bottom-[15%] w-px hidden md:block"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(0,229,200,0.3), transparent)" }} />
          <motion.div initial="hidden" animate={inView ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: 0.16 } } }}>
            <motion.p variants={fadeUp} custom={0}
              className="text-primary"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 36 }}>
              Who This Is For
            </motion.p>
            {lines.map((line, i) => (
              <motion.p key={i} variants={fadeUp} custom={i + 1}
                style={{
                  fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                  fontSize: "clamp(1.2rem, 1.7vw, 1.55rem)", lineHeight: 1.65,
                  color: C.white, marginBottom: 16,
                }}>
                {line}
              </motion.p>
            ))}
            <motion.p variants={fadeUp} custom={lines.length + 1}
              className="text-warm-rose"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 24 }}>
              This is where she belongs.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════ */
/*  THREE PILLARS                           */
/* ════════════════════════════════════════ */
const pillars = [
  { tag: "MOVE", image: moveImg, h3: "Physical experiences that feel like discovery.", p: "Your body already knows how to be extraordinary. We find it more interesting places to prove it." },
  { tag: "GATHER", image: connectImg, h3: "The room is only as good as the women in it.", p: "We've made that our entire standard." },
  { tag: "EXPAND", image: experienceImg, h3: "Unexpected combinations. Unexpected places.", p: "Unexpected versions of yourself." },
];

const PillarsSection = () => {
  const { ref, inView } = useSection();
  return (
    <section ref={ref} style={{ background: C.black, padding: "90px clamp(24px,5vw,60px) 0" }}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
        style={{ paddingBottom: 50 }}>
        <p className="text-primary" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 16 }}>
          The World of CoppahandGold
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)", color: C.white, lineHeight: 1.1 }}>
          Three pillars.<br /><em className="text-warm-rose">One standard.</em>
        </h2>
      </motion.div>
      <div className="grid md:grid-cols-3" style={{ gap: 0 }}>
        {pillars.map((p, i) => (
          <motion.div key={p.tag}
            initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className="group relative overflow-hidden"
            style={{ height: 520 }}>
            <img src={p.image} alt={p.tag} loading="lazy"
              className="absolute inset-0 w-full h-full object-cover img-mono transition-all duration-500 group-hover:scale-[1.04]"
              style={{ transition: "filter 0.5s ease, transform 0.5s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.58) saturate(0.75) contrast(1.05)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.filter = ""; }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,10,9,0.92) 0%, rgba(8,10,9,0.3) 60%, transparent 100%)" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-warm-rose/[0.15] via-warm-rose/[0.05] to-transparent" />
            <div className="absolute inset-0 border border-transparent transition-all duration-500 group-hover:border-warm-rose/30 group-hover:shadow-[inset_0_0_40px_rgba(201,132,122,0.08)]" />
            <div className="absolute bottom-0 left-0 right-0 p-9">
              <span className="inline-block rounded-full border border-warm-rose/30 bg-warm-rose/5 px-4 py-1.5 text-warm-rose"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.55rem", letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 14 }}>
                {p.tag}
              </span>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.45rem", color: C.white, lineHeight: 1.35, marginBottom: 8 }}>
                {p.h3}
              </h3>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.75rem", color: C.whiteDim, lineHeight: 1.6 }}>
                {p.p}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* ════════════════════════════════════════ */
/*  VALUES SECTION                          */
/* ════════════════════════════════════════ */
const values = [
  {
    title: "Take an active role in your wellbeing",
    desc: "Show up for your body and mind — not because someone told you to, but because you've decided to.",
  },
  {
    title: "Be of value to the room",
    desc: "Every woman here brings something. Your energy, your presence, your willingness to be open — that's what makes the room work.",
  },
  {
    title: "Stay curious about who you're becoming",
    desc: "New experiences, unfamiliar settings, unexpected conversations. Growth lives outside the routine. We build rooms that make that easy.",
  },
];

const ValuesSection = () => {
  const { ref, inView } = useSection();
  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: C.black, padding: "110px clamp(24px,5vw,60px)" }}>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/[0.05] blur-[140px] pointer-events-none" />

      <motion.div initial="hidden" animate={inView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.14 } } }}
        className="mx-auto" style={{ maxWidth: 760 }}>
        <motion.p variants={fadeUp} custom={0}
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: C.teal, marginBottom: 16 }}>
          What We Stand For
        </motion.p>
        <motion.h2 variants={fadeUp} custom={1}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: C.white, marginBottom: 12 }}>
          What is <em style={{ color: C.teal }}>community</em> for?
        </motion.h2>
        <motion.p variants={fadeUp} custom={2}
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: C.whiteDim, lineHeight: 1.8, marginBottom: 48 }}>
          We don't have a list of rules. We have a way of being. If these feel familiar, you're already one of us.
        </motion.p>

        <div className="space-y-8">
          {values.map((v, i) => (
            <motion.div key={i} variants={fadeUp} custom={i + 3}
              className="relative pl-8"
              style={{ borderLeft: `1px solid rgba(0,229,200,0.15)` }}>
              <div className="absolute left-0 top-1 w-2 h-2 rounded-full" style={{ background: C.teal, transform: "translateX(-50%)" }} />
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "1.3rem", color: C.white, marginBottom: 6 }}>
                {v.title}
              </h3>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.8rem", color: C.whiteDim, lineHeight: 1.75 }}>
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

/* ════════════════════════════════════════ */
/*  OUR WHY                                 */
/* ════════════════════════════════════════ */
const OurWhySection = () => {
  const { ref, inView } = useSection();
  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: C.black, padding: "120px clamp(24px,5vw,60px)", textAlign: "center" }}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-warm-rose/[0.12] blur-[120px]" />
      </div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/[0.06] blur-[100px] pointer-events-none" />
      <motion.div initial="hidden" animate={inView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.16 } } }}
        className="relative mx-auto" style={{ maxWidth: 760 }}>
        <motion.p variants={fadeUp} custom={0}
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: C.teal, marginBottom: 24 }}>
          Our Why
        </motion.p>
        <motion.h2 variants={fadeUp} custom={1}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: C.white, marginBottom: 32 }}>
          We build rooms women don't want to leave.
        </motion.h2>
        <motion.p variants={fadeUp} custom={2}
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.95, color: C.whiteDim }}>
          CoppahandGold exists because the right room changes everything. We are not an events company. We are building a world — where the experience is unexpected, the women in it are remarkable, and every room leaves you more than it found you.
        </motion.p>
      </motion.div>
    </section>
  );
};

/* ════════════════════════════════════════ */
/*  WAITLIST (full section)                 */
/* ════════════════════════════════════════ */
const WaitlistSectionFull = () => {
  const { ref, inView } = useSection();
  return (
    <section id="waitlist" ref={ref} className="relative overflow-hidden" style={{ background: C.black, padding: "130px clamp(24px,5vw,60px)", textAlign: "center" }}>
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-warm-rose/[0.12] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/[0.08] blur-[120px] pointer-events-none" />
      <div className="mx-auto mb-10" style={{ width: 1, height: 70, background: "linear-gradient(to bottom, transparent, rgba(0,229,200,0.4))" }} />

      <motion.div initial="hidden" animate={inView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.14 } } }}
        className="relative mx-auto flex flex-col items-center" style={{ maxWidth: 540 }}>
        <motion.p variants={fadeUp} custom={0}
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: C.teal, marginBottom: 20 }}>
          Be First in the Room
        </motion.p>
        <motion.h2 variants={fadeUp} custom={1}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.8rem, 5vw, 4.6rem)", lineHeight: 0.95, color: C.white }}>
          Be first<br />in the — <em style={{ color: C.teal }}>room.</em>
        </motion.h2>
        <motion.p variants={fadeUp} custom={2}
          style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.82rem", color: C.whiteDim, maxWidth: 440, margin: "24px auto 0", lineHeight: 1.85 }}>
          CoppahandGold experiences are limited by design. That's how we protect the quality of the room. The waitlist is how you stay ahead.
        </motion.p>
        <motion.div variants={fadeUp} custom={3} className="mt-10 w-full flex justify-center">
          <WaitlistForm source="Home - Waitlist" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;
