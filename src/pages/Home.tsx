import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
/*  HOME PAGE                               */
/* ════════════════════════════════════════ */
const Home = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWaitlist = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("rsvp_submissions").insert({
        first_name: "Waitlist", last_name: "Subscriber", email,
      });
      if (error) throw error;
      toast({ title: "You're on the list.", description: "We'll be in touch." });
      setEmail("");
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [email]);

  return (
    <div className="min-h-screen teal-cursor" style={{ background: C.black, color: C.white }}>
      <TealCursor />
      <GrainOverlay />
      <Navbar />
      <HeroSection />
      <ManifestoStrip />
      <WhoSection />
      <PillarsSection />
      <EventsSection />
      <OurWhySection />
      <WaitlistSection email={email} setEmail={setEmail} loading={loading} onSubmit={handleWaitlist} />
      <Footer />
    </div>
  );
};

/* ════════════════════════════════════════ */
/*  SECTION 1 — HERO                        */
/* ════════════════════════════════════════ */
const HeroSection = () => (
  <section className="relative min-h-screen overflow-hidden">
    {/* bg image */}
    <div className="absolute inset-0">
      <img src={heroImg} alt="" className="h-full w-full object-cover img-mono" />
      <div className="absolute inset-0" style={{ background: `${C.black}99` }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.black}, transparent 50%, ${C.black}66)` }} />
    </div>

    {/* blush glow bottom-left */}
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(201,132,122,0.22) 0%, transparent 70%)" }} />
    {/* teal glow bottom-right */}
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,229,200,0.1) 0%, transparent 70%)" }} />

    {/* content — bottom left */}
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
          <a href="#waitlist"
            className="teal-pulse"
            style={{
              border: `1px solid ${C.teal}`, borderRadius: 0, padding: "14px 36px",
              fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase",
              color: C.teal, textDecoration: "none", display: "inline-block",
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
/*  SECTION 2 — MANIFESTO STRIP              */
/* ════════════════════════════════════════ */
const ManifestoStrip = () => {
  const { ref, inView } = useSection();
  return (
    <section id="manifesto" ref={ref}
      style={{
        background: C.black, padding: "90px 60px", textAlign: "center",
        borderTop: "1px solid rgba(0,229,200,0.12)", borderBottom: "1px solid rgba(0,229,200,0.12)",
        position: "relative", overflow: "hidden",
      }}>
      {/* teal center glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,229,200,0.04) 0%, transparent 70%)" }} />
      </div>

      <motion.p
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1.4 }}
        className="relative mx-auto"
        style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic",
          fontSize: "clamp(1.4rem, 2.6vw, 2.1rem)", lineHeight: 1.5, maxWidth: 760, color: C.white,
        }}>
        "We don't sell experiences. We <span style={{ color: C.teal }}>architect</span> the moments women carry with them."
      </motion.p>
    </section>
  );
};

/* ════════════════════════════════════════ */
/*  SECTION 3 — WHO THIS IS FOR              */
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
        {/* left — image */}
        <div className="relative overflow-hidden" style={{ minHeight: 400 }}>
          <img src={portraitImg} alt="" className="absolute inset-0 w-full h-full object-cover img-mono" />
          {/* blush overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(201,132,122,0.2) 0%, transparent 55%)" }} />
          {/* right edge fade */}
          <div className="absolute inset-0 hidden md:block" style={{ background: `linear-gradient(to right, transparent 65%, ${C.black} 100%)` }} />
          {/* bottom fade on mobile */}
          <div className="absolute inset-0 md:hidden" style={{ background: `linear-gradient(to bottom, transparent 60%, ${C.black} 100%)` }} />
        </div>

        {/* right — text */}
        <div className="relative flex items-center" style={{ padding: "clamp(40px,6vw,90px) clamp(24px,5vw,70px)" }}>
          {/* left accent line */}
          <div className="absolute left-0 top-[15%] bottom-[15%] w-px hidden md:block"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(0,229,200,0.3), transparent)" }} />

          <motion.div initial="hidden" animate={inView ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: 0.16 } } }}>
            <motion.p variants={fadeUp} custom={0}
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: C.teal, marginBottom: 36 }}>
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
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.teal, marginTop: 24 }}>
              This is where she belongs.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════ */
/*  SECTION 4 — THREE PILLARS               */
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
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: C.teal, marginBottom: 16 }}>
          The World of CoppahandGold
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)", color: C.white, lineHeight: 1.1 }}>
          Three pillars.<br /><em style={{ color: C.teal }}>One standard.</em>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3" style={{ gap: 0 }}>
        {pillars.map((p, i) => (
          <motion.div key={p.tag}
            initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className="group relative overflow-hidden"
            style={{ height: 520 }}>
            {/* image */}
            <img src={p.image} alt={p.tag} loading="lazy"
              className="absolute inset-0 w-full h-full object-cover img-mono transition-all duration-500 group-hover:img-mono-hover group-hover:scale-[1.04]"
              style={{ transition: "filter 0.5s ease, transform 0.5s ease" }}
            />
            {/* dark gradient */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,10,9,0.92) 0%, rgba(8,10,9,0.3) 60%, transparent 100%)" }} />
            {/* blush bottom glow */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(201,132,122,0.12) 0%, transparent 40%)" }} />
            {/* hover border */}
            <div className="absolute inset-0 border border-transparent transition-all duration-500 group-hover:border-[rgba(0,229,200,0.45)] group-hover:shadow-[inset_0_0_40px_rgba(0,229,200,0.05)]" />

            {/* content */}
            <div className="absolute bottom-0 left-0 right-0 p-9">
              <span style={{
                display: "inline-block", border: "1px solid rgba(0,229,200,0.4)", padding: "4px 14px",
                fontFamily: "'Jost', sans-serif", fontSize: "0.55rem", letterSpacing: "0.28em", textTransform: "uppercase",
                color: C.teal, marginBottom: 14,
              }}>{p.tag}</span>
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
/*  SECTION 5 — UPCOMING EVENTS             */
/* ════════════════════════════════════════ */
{/* <!-- UPDATE THIS SECTION FOR EACH NEW EVENT --> */}
const EventsSection = () => {
  const { ref, inView } = useSection();
  return (
    <section ref={ref} style={{ background: C.black, padding: "110px clamp(24px,5vw,60px)" }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: C.teal, marginBottom: 16 }}>
          What's in the Room
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: C.white, marginBottom: 40 }}>
          The next room is almost ready.
        </h2>
      </motion.div>

      {/* featured event card */}
      <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
        className="grid md:grid-cols-5 overflow-hidden"
        style={{
          background: "#0f1210", border: "1px solid rgba(0,229,200,0.2)",
          minHeight: 420, position: "relative",
        }}>
        {/* blush glow top-right */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px]" style={{ background: "radial-gradient(circle, rgba(201,132,122,0.08) 0%, transparent 70%)" }} />

        {/* left — details */}
        <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center relative z-10">
          <span style={{
            display: "inline-block", background: C.teal, color: C.black, padding: "4px 14px",
            fontFamily: "'Jost', sans-serif", fontSize: "0.52rem", letterSpacing: "0.3em", textTransform: "uppercase",
            marginBottom: 20, width: "fit-content",
          }}>Coming Soon</span>

          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: C.white, marginBottom: 14 }}>
            Cones & Code
          </h3>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.78rem", color: C.whiteDim, lineHeight: 1.8, maxWidth: 460, marginBottom: 16 }}>
            One evening. Three experiences. You'll leave with a new skill — and you'll have had fun doing it.
          </p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.68rem", letterSpacing: "0.1em", color: C.whiteDim, marginBottom: 20 }}>
            Date TBC · Abuja, Nigeria · <span style={{ color: C.teal }}>Limited</span>
          </p>

          {/* included list */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8">
            {["Yoga", "Ice Cream Bar", "Vibe Coding", "Good Company"].map((item) => (
              <span key={item} className="flex items-center gap-2" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.7rem", color: C.whiteDim }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.teal }} />
                {item}
              </span>
            ))}
          </div>

          <a href="#waitlist" style={{
            border: `1px solid ${C.teal}`, padding: "12px 28px", display: "inline-block", width: "fit-content",
            fontFamily: "'Jost', sans-serif", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase",
            color: C.teal, textDecoration: "none",
          }}>Join the Waitlist</a>
        </div>

        {/* right — image placeholder */}
        {/* <!-- SWAP THIS IMAGE WITH EVENT-SPECIFIC IMAGE EACH TIME --> */}
        <div className="md:col-span-2 relative flex items-center justify-center" style={{ background: "#0a0d0b", borderLeft: "1px solid rgba(0,229,200,0.08)", minHeight: 250 }}>
          <div className="absolute right-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(0,229,200,0.15), transparent)" }} />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "0.95rem", color: C.whiteDim, textAlign: "center", padding: 40 }}>
            Photography coming soon.
          </p>
        </div>
      </motion.div>

      {/* teaser cards */}
      <div className="grid md:grid-cols-2 gap-0 mt-0">
        {[
          { label: "IN THE WORKS", text: "The room you didn't know you needed." },
          { label: "WAITLIST ONLY", text: "Unexpected place. Exactly the right women." },
        ].map((card) => (
          <div key={card.label} className="flex flex-col items-center justify-center text-center"
            style={{ height: 180, background: C.black, border: "1px solid rgba(0,229,200,0.12)" }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.52rem", letterSpacing: "0.3em", textTransform: "uppercase", color: C.teal, marginBottom: 12 }}>
              {card.label}
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.1rem", color: C.white }}>
              {card.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ════════════════════════════════════════ */
/*  SECTION 6 — OUR WHY                     */
/* ════════════════════════════════════════ */
const OurWhySection = () => {
  const { ref, inView } = useSection();
  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: C.black, padding: "120px clamp(24px,5vw,60px)", textAlign: "center" }}>
      {/* blush glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(201,132,122,0.1) 0%, transparent 60%)" }} />
      </div>

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
/*  SECTION 7 — WAITLIST                     */
/* ════════════════════════════════════════ */
const WaitlistSection = ({ email, setEmail, loading, onSubmit }: {
  email: string; setEmail: (v: string) => void; loading: boolean; onSubmit: (e: React.FormEvent) => void;
}) => {
  const { ref, inView } = useSection();
  return (
    <section id="waitlist" ref={ref} className="relative overflow-hidden" style={{ background: C.black, padding: "130px clamp(24px,5vw,60px)", textAlign: "center" }}>
      {/* blush glow top-left */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px]" style={{ background: "radial-gradient(circle, rgba(201,132,122,0.09) 0%, transparent 70%)" }} />
      {/* teal glow bottom-right */}
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px]" style={{ background: "radial-gradient(circle, rgba(0,229,200,0.07) 0%, transparent 70%)" }} />

      {/* vertical teal line */}
      <div className="mx-auto mb-10" style={{ width: 1, height: 70, background: "linear-gradient(to bottom, transparent, rgba(0,229,200,0.4))" }} />

      <motion.div initial="hidden" animate={inView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.14 } } }}
        className="relative mx-auto" style={{ maxWidth: 540 }}>
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

        <motion.form variants={fadeUp} custom={3} onSubmit={onSubmit}
          className="mt-10 flex mx-auto" style={{ maxWidth: 480 }}>
          <input type="email" required placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)}
            className="flex-1 outline-none"
            style={{
              background: "rgba(240,237,232,0.04)", border: "1px solid rgba(240,237,232,0.12)", borderRight: "none",
              padding: "18px 20px", fontFamily: "'Jost', sans-serif", fontSize: "0.78rem", color: C.white,
            }}
            onFocus={e => e.currentTarget.style.borderColor = "rgba(0,229,200,0.4)"}
            onBlur={e => e.currentTarget.style.borderColor = "rgba(240,237,232,0.12)"}
          />
          <button type="submit" disabled={loading}
            className="transition-all duration-300 hover:bg-transparent hover:shadow-[0_0_30px_rgba(0,229,200,0.2)]"
            style={{
              background: C.teal, color: C.black, padding: "18px 28px", border: `1px solid ${C.teal}`,
              fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = C.teal; }}
            onMouseLeave={e => { e.currentTarget.style.color = C.black; e.currentTarget.style.background = C.teal; }}>
            {loading ? "Securing…" : "Secure My Place"}
          </button>
        </motion.form>

        <motion.p variants={fadeUp} custom={4}
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.whiteFaint, marginTop: 24 }}>
          No noise. Just the rooms worth knowing about.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Home;
