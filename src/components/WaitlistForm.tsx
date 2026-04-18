import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const C = {
  black: "#080a09",
  teal: "#00e5c8",
  blush: "#c9847a",
  white: "#f0ede8",
  whiteDim: "rgba(240,237,232,0.55)",
  whiteFaint: "rgba(240,237,232,0.25)",
};

type WaitlistFormProps = {
  source?: string;
  /** If provided, renders inline (name + email + phone). Otherwise full standalone section. */
  inline?: boolean;
  /** Optional Selar link for direct checkout events */
  selarUrl?: string;
};

const WaitlistForm = ({ source = "Website", inline = false, selarUrl }: WaitlistFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !lastName) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("rsvp_submissions").insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone || null,
      });
      if (error) throw error;

      // Fire-and-forget notification
      supabase.functions.invoke("send-waitlist-email", {
        body: { firstName, lastName, email, phone, source },
      }).catch(() => {});

      if (selarUrl) {
        const fullname = encodeURIComponent(`${firstName} ${lastName}`);
        const encodedEmail = encodeURIComponent(email);
        const encodedPhone = encodeURIComponent(phone);
        const checkoutUrl = `${selarUrl}?add_to_cart=1&fullname=${fullname}&email=${encodedEmail}&mobile=${encodedPhone}`;
        toast({ title: "Redirecting to checkout…", description: "Taking you to secure payment." });
        window.location.href = checkoutUrl;
        return;
      }

      setDone(true);
      toast({ title: "You're on the list.", description: "We'll be in touch with the details." });
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [firstName, lastName, email, phone, source, selarUrl]);

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="text-3xl mb-3">✦</div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.6rem", color: C.teal }}>
          You're in.
        </h3>
        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.8rem", color: C.whiteDim, marginTop: 8 }}>
          We'll reach out when the room is ready.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 w-full" style={{ maxWidth: inline ? "100%" : 520 }}>
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          required
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={loading}
          className="outline-none w-full"
          style={{
            background: "rgba(240,237,232,0.04)",
            border: "1px solid rgba(240,237,232,0.12)",
            padding: "14px 18px",
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.78rem",
            color: C.white,
          }}
        />
        <input
          type="text"
          required
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          disabled={loading}
          className="outline-none w-full"
          style={{
            background: "rgba(240,237,232,0.04)",
            border: "1px solid rgba(240,237,232,0.12)",
            padding: "14px 18px",
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.78rem",
            color: C.white,
          }}
        />
      </div>
      <input
        type="email"
        required
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        className="outline-none w-full"
        style={{
          background: "rgba(240,237,232,0.04)",
          border: "1px solid rgba(240,237,232,0.12)",
          padding: "14px 18px",
          fontFamily: "'Jost', sans-serif",
          fontSize: "0.78rem",
          color: C.white,
        }}
      />
      <input
        type="tel"
        placeholder="Phone number (optional)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={loading}
        className="outline-none w-full"
        style={{
          background: "rgba(240,237,232,0.04)",
          border: "1px solid rgba(240,237,232,0.12)",
          padding: "14px 18px",
          fontFamily: "'Jost', sans-serif",
          fontSize: "0.78rem",
          color: C.white,
        }}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full teal-pulse transition-all duration-300 hover:bg-transparent hover:shadow-[0_0_30px_rgba(0,229,200,0.2)] flex items-center justify-center gap-2"
        style={{
          background: C.teal,
          color: C.black,
          padding: "16px 28px",
          border: `1px solid ${C.teal}`,
          fontFamily: "'Jost', sans-serif",
          fontWeight: 400,
          fontSize: "0.62rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase" as const,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = C.teal; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = C.black; e.currentTarget.style.background = C.teal; }}
      >
        {loading ? <><Loader2 className="h-3 w-3 animate-spin" /> Securing…</> : "Secure My Spot"}
      </button>
      <p style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: "0.55rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase" as const,
        color: C.whiteFaint,
        textAlign: "center" as const,
        marginTop: 12,
      }}>
        No noise. Just the rooms worth knowing about.
      </p>
    </form>
  );
};

export default WaitlistForm;
