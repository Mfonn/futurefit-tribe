import socialBg from "@/assets/flyer-social-bg.jpg";

/* ─── EDITABLE CONTENT ─── */
const CONTENT = {
  brandName: "CoppahandGold",
  headline: "SAVE THE DATE",
  date: "MARCH 28TH, 29TH 2026",
  location: "ABUJA, NIGERIA",
  activities: ["Tennis", "Mat Pilates", "Yoga", "Bio Bar"],
  tagline: "Where Science Meets Sweat",
  instagram: "@coppahandgold",
  website: "www.coppahandgold.com",
};
/* ─── END EDITABLE ─── */

const FlyerSocial = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 md:p-8">
      <div
        className="relative w-full max-w-[540px] overflow-hidden rounded-xl shadow-2xl"
        style={{ aspectRatio: "9/16" }}
      >
        {/* Background — deeply blended */}
        <img
          src={socialBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Heavy overlay to push image back */}
        <div className="absolute inset-0 bg-[hsl(200_30%_8%/0.55)]" />

        {/* Subtle tennis court outline — inspired by reference */}
        <div className="absolute inset-[12%] border border-foreground/15 rounded-sm" />
        <div className="absolute left-[12%] right-[12%] top-1/2 h-px bg-foreground/15" />
        <div className="absolute left-1/2 top-[12%] bottom-[12%] w-px bg-foreground/15" />

        {/* Content — minimal, anchored */}
        <div className="relative z-10 flex h-full flex-col items-center justify-between py-16 px-10">
          {/* Top: Brand name */}
          <p className="font-display text-base tracking-[0.3em] text-foreground/90">
            {CONTENT.brandName}
          </p>

          {/* Center: Core message */}
          <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="font-display text-5xl font-extrabold leading-none tracking-tight text-foreground md:text-6xl">
              {CONTENT.headline}
            </h1>

            <div className="h-px w-16 bg-primary/50" />

            <p className="font-display text-lg font-semibold tracking-[0.15em] text-foreground/90 md:text-xl">
              {CONTENT.date}
            </p>

            <p className="font-body text-xs tracking-[0.25em] text-primary/80">
              {CONTENT.location}
            </p>

            {/* Activities — single clean line */}
            <p className="font-body text-[11px] tracking-[0.15em] text-foreground/60">
              {CONTENT.activities.join("  ·  ")}
            </p>
          </div>

          {/* Bottom: Social handle */}
          <div className="flex flex-col items-center gap-2">
            <p className="font-body text-[11px] tracking-[0.1em] text-foreground/50">
              {CONTENT.tagline}
            </p>
            <p className="font-body text-xs tracking-[0.15em] text-primary/70">
              {CONTENT.instagram}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlyerSocial;
