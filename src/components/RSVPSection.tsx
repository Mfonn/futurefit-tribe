import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

type SubmitState = "idle" | "saving" | "found" | "done";

const RSVPSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState("saving");

    // Save to database
    await supabase.from("rsvp_submissions").insert({
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phone || null,
    });

    // Show "Checking availability..." for 1.5s
    setTimeout(() => {
      setSubmitState("found");

      // Show "Spot found!" for 1.5s then redirect
      setTimeout(() => {
        const fullname = encodeURIComponent(`${firstName} ${lastName}`);
        const encodedEmail = encodeURIComponent(email);
        const encodedPhone = encodeURIComponent(phone);
        const selarUrl = `https://selar.com/c57dr3g936?add_to_cart=1&fullname=${fullname}&email=${encodedEmail}&mobile=${encodedPhone}`;
        window.open(selarUrl, "_blank");
      }, 1500);
    }, 1500);
  };

  return (
    <section id="rsvp" className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute left-1/4 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute right-1/4 top-1/3 h-60 w-60 rounded-full bg-warm-rose/5 blur-[100px]" />

      <div className="mx-auto max-w-2xl text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}>
          
          <p className="mb-4 font-body text-sm tracking-[0.3em] text-primary">
            LIMITED SPOTS
          </p>
          <h2 className="mb-6 font-display text-4xl font-bold md:text-5xl lg:text-6xl">
            Secure your{" "}
            <span className="glow-text">invitation</span>
          </h2>
          <p className="mb-12 font-body text-base leading-relaxed text-muted-foreground">
            This is an intimate experience with limited slots. Enter your details to reserve your place at the intersection of science, sport, and restoration.
          </p>
        </motion.div>

        {submitState === "done" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-card glow-border p-10">
            <div className="mb-4 text-4xl">✦</div>
            <h3 className="mb-2 font-display text-2xl font-bold glow-text">
              You're In
            </h3>
            <p className="font-body text-sm text-muted-foreground">
              We'll send you the details soon. Prepare to be transformed.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4">
            
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="First Name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={submitState !== "idle"}
                className="glass-card w-full px-5 py-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors disabled:opacity-50"
              />
              <input
                type="text"
                placeholder="Last Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={submitState !== "idle"}
                className="glass-card w-full px-5 py-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors disabled:opacity-50"
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitState !== "idle"}
              className="glass-card w-full px-5 py-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors disabled:opacity-50"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={submitState !== "idle"}
              className="glass-card w-full px-5 py-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={submitState !== "idle"}
              className={`group mt-4 w-full rounded-full py-4 font-body text-sm font-semibold tracking-wide transition-all duration-500 flex items-center justify-center gap-2 ${
                submitState === "found"
                  ? "bg-primary/90 text-primary-foreground shadow-[0_0_60px_hsl(165_80%_45%/0.5)]"
                  : "bg-primary text-primary-foreground hover:shadow-[0_0_50px_hsl(165_80%_45%/0.4)]"
              }`}
            >
              {submitState === "idle" && <>Request a Spot →</>}
              {submitState === "saving" && (
                <span className="flex items-center gap-2 animate-pulse">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Checking availability...
                </span>
              )}
              {submitState === "found" && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <span className="font-bold text-background drop-shadow-[0_0_8px_hsl(165_80%_45%/0.8)]">Spot found!</span>
                  <span className="text-primary-foreground/90">Securing your place…</span>
                </motion.span>
              )}
            </button>

            {/* Microcopy */}
            <p className="mt-3 font-body text-xs tracking-wide text-muted-foreground/60">
              Clicking will take you to our secure checkout to finalize your reservation. Spots are held for 15 minutes.
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default RSVPSection;
