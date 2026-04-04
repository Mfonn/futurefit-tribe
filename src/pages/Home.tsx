import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: "easeOut" },
  }),
};

const pillars = [
  {
    label: "MOVE",
    headline: "Physical experiences that feel like discovery.",
  },
  {
    label: "CONNECT",
    headline: "Rooms designed around the quality of the women in them.",
  },
  {
    label: "EXPERIENCE",
    headline: "Unexpected combinations. Unexpected places. Unexpected versions of yourself.",
  },
];

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
      {/* ─── Hero ─── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />
        <div className="absolute left-[20%] top-[30%] h-72 w-72 rounded-full bg-primary/5 blur-[120px] orb-float" />
        <div className="absolute right-[15%] bottom-[25%] h-56 w-56 rounded-full bg-bio-teal/5 blur-[100px] orb-float-delayed" />

        <motion.div className="relative z-10 max-w-3xl" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
          <motion.h1 variants={fadeUp} custom={0} className="font-display text-5xl font-bold leading-tight md:text-7xl lg:text-8xl">
            Some rooms change you.
          </motion.h1>
          <motion.p variants={fadeUp} custom={1} className="mt-6 font-body text-lg text-muted-foreground md:text-xl">
            We curate the ones worth being in.
          </motion.p>
          <motion.div variants={fadeUp} custom={2} className="mt-10">
            <a
              href="#waitlist"
              className="inline-block rounded-full border border-primary/60 px-8 py-4 font-body text-sm font-semibold tracking-wide text-primary transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_hsl(var(--primary)/0.25)]"
            >
              Join the Waitlist
            </a>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent breathing" />
      </section>

      {/* ─── Manifesto ─── */}
      <section className="px-6 py-28 md:py-40">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mx-auto max-w-5xl text-center font-display text-2xl font-semibold leading-relaxed md:text-3xl lg:text-4xl"
        >
          We don't sell experiences. We architect the moments women carry with them.
        </motion.p>
      </section>

      {/* ─── Three Pillars ─── */}
      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group rounded-2xl border border-border/40 bg-card p-8 transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_hsl(var(--primary)/0.12)]"
            >
              <p className="mb-4 font-body text-xs font-semibold tracking-[0.3em] text-primary">
                {p.label}
              </p>
              <p className="font-display text-lg font-medium leading-relaxed text-foreground/90">
                {p.headline}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Editorial Image Grid ─── */}
      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center font-display text-3xl font-bold md:text-4xl"
          >
            A taste of what we build.
          </motion.h2>

          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="aspect-[4/5] rounded-2xl border border-border/30 bg-gradient-to-b from-secondary/60 to-card"
              />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 text-center font-body text-sm text-muted-foreground"
          >
            Every experience is different. Every room is deliberate.
          </motion.p>
        </div>
      </section>

      {/* ─── Who This Is For ─── */}
      <section className="px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="font-display text-2xl font-semibold leading-relaxed md:text-3xl lg:text-4xl">
              She has taste and uses it. She invests in experiences over things. She walks into a room and makes it better. She's done with ordinary — not because she's difficult, but because she's aware.
            </p>
            <p className="mt-8 font-display text-2xl font-semibold text-primary md:text-3xl lg:text-4xl">
              This is where she belongs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Waitlist ─── */}
      <section id="waitlist" className="px-6 py-28 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Be first in the room.
          </h2>
          <p className="mt-4 font-body text-muted-foreground">
            CoppahandGold experiences are limited by design. The waitlist is how you stay ahead.
          </p>

          <form onSubmit={handleWaitlist} className="mt-10 flex flex-col gap-4 sm:flex-row">
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

      {/* ─── Footer ─── */}
      <footer className="border-t border-border/30 px-6 py-12 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-display text-lg font-bold tracking-wider">
            <span className="glow-text">COPPAHANDGOLD</span>
          </p>
          <p className="max-w-sm text-center font-body text-xs text-muted-foreground md:text-right">
            An ecosystem built at the intersection of wellness and legacy.
          </p>
          <a
            href="https://www.instagram.com/coppahandgold?igsh=MXVpNXl0ZndjNWlnNA%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            @coppahandgold
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
