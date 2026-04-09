import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";

const C = {
  black: "#080a09",
  teal: "#00e5c8",
  blush: "#c9847a",
  white: "#f0ede8",
  whiteDim: "rgba(240,237,232,0.55)",
  whiteFaint: "rgba(240,237,232,0.25)",
};

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

/* ── Event data ── */
/* <!-- UPDATE THIS SECTION FOR EACH NEW EVENT --> */
const events = [
  {
    status: "TICKETS AVAILABLE",
    statusColor: C.teal,
    name: "Cones & Code",
    tagline: "One evening. Three experiences. You'll leave with a new skill — and you'll have had fun doing it.",
    date: "Late April 2025 · Abuja, Nigeria",
    includes: ["Mat Yoga", "Ice Cream Bar", "Vibe Coding", "Good Company"],
    price: "₦45,000",
    cta: "Get Your Ticket",
    selarUrl: "https://selar.com/v388h7t888",
    accentColor: "rgba(236,160,172,0.35)",
  },
  {
    status: "COMING SOON",
    statusColor: C.blush,
    name: "The Tennis Classic",
    tagline: "Competitive play meets curated recovery. Tennis on premium courts, healthy drinks at a luxury hotel, and the kind of afternoon you'll want to relive.",
    date: "Second week of May · Abuja, Nigeria",
    includes: ["Tennis Sessions", "Bio Bar Drinks", "Luxury Hotel Setting", "Recovery Lounge"],
    price: "TBC",
    cta: "Join the Waitlist",
    accentColor: "rgba(80,200,120,0.3)",
  },
  {
    status: "COMING SOON",
    statusColor: C.blush,
    name: "Sunset Sessions",
    tagline: "A rooftop. Deep house music. A buffet. Sunset yoga. The city below, the sky above, and nothing between you and the moment.",
    date: "Late May · Abuja, Nigeria",
    includes: ["Rooftop Yoga", "Deep House DJ Set", "Sunset Buffet", "Curated Drinks"],
    price: "TBC",
    cta: "Join the Waitlist",
    accentColor: "rgba(160,120,80,0.3)",
  },
  {
    status: "COMING SOON",
    statusColor: C.blush,
    name: "The Hyrox Experience",
    tagline: "A festival for your body. High-intensity. Community-driven. The kind of challenge that makes you feel alive — and the kind of people who make it unforgettable.",
    date: "Early June · Abuja, Nigeria",
    includes: ["Hyrox-Style Workout", "Fitness Festival", "Recovery Zone", "Community"],
    price: "TBC",
    cta: "Join the Waitlist",
    accentColor: "rgba(80,200,120,0.3)",
  },
  {
    status: "COMING SOON",
    statusColor: C.blush,
    name: "Auto Zen",
    tagline: "Yoga in a car showroom. Luxury machines. Controlled breathing. It sounds unexpected — that's the point.",
    date: "Late May · Abuja, Nigeria",
    includes: ["Yoga Session", "Car Showroom Access", "Curated Drinks", "An Unexpected Setting"],
    price: "TBC",
    cta: "Join the Waitlist",
    accentColor: "rgba(180,190,200,0.28)",
  },
];

const EventCard = ({ event, index }: { event: typeof events[0]; index: number }) => {
  const { ref, inView } = useSection();
  const [showForm, setShowForm] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative overflow-hidden"
      style={{
        background: "#0f1210",
        border: "1px solid rgba(0,229,200,0.15)",
      }}
    >
      {/* accent glow */}
      <div className="absolute top-0 right-0 w-[250px] h-[250px] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${event.accentColor} 0%, transparent 70%)` }} />

      <div className="relative z-10 p-8 md:p-12">
        {/* status */}
        <span className="inline-block rounded-full px-4 py-1.5 mb-6"
          style={{
            border: `1px solid ${event.statusColor}40`,
            background: `${event.statusColor}15`,
            color: event.statusColor,
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.52rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}>
          {event.status}
        </span>

        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic",
          fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: C.white, marginBottom: 14,
        }}>
          {event.name}
        </h3>

        <p style={{
          fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.82rem",
          color: C.whiteDim, lineHeight: 1.8, maxWidth: 560, marginBottom: 16,
        }}>
          {event.tagline}
        </p>

        <p style={{
          fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.68rem",
          letterSpacing: "0.1em", color: C.whiteDim, marginBottom: 20,
        }}>
          {event.date} · {event.price !== "TBC" ? <span style={{ color: C.teal }}>{event.price}</span> : <span style={{ color: C.blush }}>Price TBC</span>} · <span style={{ color: C.teal }}>Limited</span>
        </p>

        {/* includes */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8">
          {event.includes.map((item) => (
            <span key={item} className="flex items-center gap-2" style={{
              fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.7rem", color: C.whiteDim,
            }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.teal }} />
              {item}
            </span>
          ))}
        </div>

        {!showForm ? (
          <button
            onClick={() => {
              if (event.selarUrl) {
                setShowForm(true);
              } else {
                setShowForm(true);
              }
            }}
            style={{
              border: `1px solid ${C.teal}`,
              padding: "12px 28px",
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: C.teal,
              background: "transparent",
              cursor: "pointer",
            }}
          >
            {event.cta}
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ maxWidth: 480 }}
          >
            <WaitlistForm
              source={`Experience - ${event.name}`}
              selarUrl={event.selarUrl}
              inline
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

/* ── Values ── */
const communityValues = [
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
    desc: "New experiences, unfamiliar settings, unexpected conversations. Growth lives outside the routine.",
  },
];

const Experience = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const valuesSection = useSection();

  return (
    <div className="min-h-screen" style={{ background: C.black, color: C.white }}>
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ paddingTop: 140, paddingBottom: 80, paddingLeft: "clamp(24px,5vw,60px)", paddingRight: "clamp(24px,5vw,60px)" }}>
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-warm-rose/[0.08] blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-primary/[0.06] blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl"
        >
          <p style={{
            fontFamily: "'Jost', sans-serif", fontSize: "0.58rem", letterSpacing: "0.35em",
            textTransform: "uppercase", color: C.teal, marginBottom: 16,
          }}>
            What's in the Room
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
            fontSize: "clamp(2.8rem, 5vw, 4.5rem)", lineHeight: 1, color: C.white, marginBottom: 20,
          }}>
            Experiences <em style={{ color: C.teal }}>worth showing up for.</em>
          </h1>
          <p style={{
            fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.9rem",
            color: C.whiteDim, lineHeight: 1.8, maxWidth: 520,
          }}>
            Each room is designed around a feeling, not a formula. Here's what's coming — and what's almost ready.
          </p>
        </motion.div>
      </section>

      {/* Events */}
      <section style={{ padding: "0 clamp(24px,5vw,60px) 80px" }}>
        <div className="space-y-6 max-w-4xl mx-auto">
          {events.map((event, i) => (
            <EventCard key={event.name} event={event} index={i} />
          ))}
        </div>
      </section>

      {/* Values */}
      <section ref={valuesSection.ref} className="relative overflow-hidden" style={{ background: C.black, padding: "100px clamp(24px,5vw,60px)" }}>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/[0.05] blur-[140px] pointer-events-none" />

        <motion.div initial="hidden" animate={valuesSection.inView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.14 } } }}
          className="mx-auto" style={{ maxWidth: 760 }}>
          <motion.p variants={fadeUp} custom={0}
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: C.teal, marginBottom: 16 }}>
            What We Expect
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
            {communityValues.map((v, i) => (
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

      {/* Waitlist */}
      <section className="relative overflow-hidden" style={{ background: C.black, padding: "100px clamp(24px,5vw,60px)", textAlign: "center" }}>
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-warm-rose/[0.09] blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/[0.06] blur-[100px] pointer-events-none" />

        <div className="relative z-10 mx-auto flex flex-col items-center" style={{ maxWidth: 540 }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: C.teal, marginBottom: 20 }}>
            Don't Miss the Room
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3rem)", color: C.white, marginBottom: 24 }}>
            Stay <em style={{ color: C.teal }}>ahead.</em>
          </h2>
          <WaitlistForm source="Experience Page" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Experience;

import { useState } from "react";
