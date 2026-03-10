import socialBg from "@/assets/flyer-social-bg.jpg";

/* ─── EDITABLE CONTENT ─── */
const CONTENT = {
  brandName: "COPPAHANDGOLD",
  headline: "Serving Wellness,",
  headlineAccent: "Always.",
  subtext: "You don't have to choose between competitive and gentle. We made space for both.",
  date: "28 — 29 MARCH 2026",
  location: "ABUJA, NIGERIA",
  pillars: ["TENNIS", "MAT PILATES", "YOGA", "BIO BAR"],
  cta: "Limited Slots · RSVP Now",
  website: "www.coppahandgold.com",
  instagram: "@coppahandgold",
  tiktok: "@coppahandgold",
  phone: "+234 000 000 0000",
};
/* ─── END EDITABLE ─── */

const FlyerSocial = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 md:p-8">
      {/* Social post canvas — 1:1 for feed, shown at 1080×1080 ratio */}
      <div
        className="relative w-full max-w-[540px] overflow-hidden rounded-xl shadow-2xl"
        style={{ aspectRatio: "9/16" }}
      >
        {/* Background image */}
        <img
          src={socialBg}
          alt="Tennis court"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay — dark at top and bottom for text */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(200_20%_4%/0.75)] via-transparent to-[hsl(200_20%_4%/0.85)]" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-10">
          {/* Top: Brand */}
          <div>
            <div className="mb-6 flex items-center gap-2">
              <div className="h-px w-6 bg-primary/60" />
              <p className="font-body text-[10px] tracking-[0.4em] text-primary">
                {CONTENT.brandName}
              </p>
            </div>

            <h1 className="font-display text-5xl font-extrabold leading-[1.05] text-foreground md:text-6xl">
              {CONTENT.headline}
              <br />
              <span className="italic text-primary">{CONTENT.headlineAccent}</span>
            </h1>

            <p className="mt-4 max-w-[280px] font-body text-sm leading-relaxed text-foreground/80">
              {CONTENT.subtext}
            </p>
          </div>

          {/* Middle: Pillars */}
          <div className="flex flex-wrap gap-2">
            {CONTENT.pillars.map((p) => (
              <span
                key={p}
                className="rounded-full border border-primary/30 bg-[hsl(200_15%_8%/0.6)] px-3 py-1.5 font-body text-[10px] tracking-[0.2em] text-primary backdrop-blur-sm"
              >
                {p}
              </span>
            ))}
          </div>

          {/* Bottom: Event info + Contact */}
          <div>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="font-display text-2xl font-bold text-foreground">
                  {CONTENT.date}
                </p>
                <p className="mt-1 font-body text-xs tracking-[0.2em] text-primary/80">
                  {CONTENT.location}
                </p>
              </div>
            </div>

            <p className="mb-4 font-body text-sm font-medium text-warm-rose">
              {CONTENT.cta}
            </p>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="mt-3 flex flex-wrap items-center gap-4">
              <p className="font-body text-[10px] text-muted-foreground">
                {CONTENT.instagram}
              </p>
              <p className="font-body text-[10px] text-muted-foreground">
                {CONTENT.tiktok}
              </p>
              <p className="font-body text-[10px] text-muted-foreground">
                {CONTENT.website}
              </p>
              <p className="font-body text-[10px] text-muted-foreground">
                {CONTENT.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlyerSocial;
