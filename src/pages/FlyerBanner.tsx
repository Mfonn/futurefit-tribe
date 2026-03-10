import bannerBg from "@/assets/flyer-banner-bg.jpg";

/* ─── EDITABLE CONTENT ─── */
const BANNER = {
  brandName: "COPPAHANDGOLD",
  tagline: "Redefining the Wellness Experience",
  concepts: [
    { text: "Science Meets Sweat", description: "Where physical movement meets evidence-based recovery." },
    { text: "Science You Can Sip", description: "Pharmacist-curated herbal elixirs, made fresh on-site." },
    { text: "Move With Intention", description: "Mat pilates, yoga, and guided breathwork for every body." },
    { text: "Play Without Pressure", description: "Beginner-friendly tennis — competitive spirit, inclusive energy." },
    { text: "Mind · Body · Biology", description: "A holistic approach to wellness through movement, nutrition, and community." },
  ],
  cta: "Join the Movement",
  date: "28 — 29 March, 2026",
  location: "Abuja, Nigeria",
  website: "www.coppahandgold.com",
  instagram: "@coppahandgold",
  phone: "+234 000 000 0000",
  email: "hello@coppahandgold.com",
};
/* ─── END EDITABLE ─── */

const FlyerBanner = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 md:p-8">
      {/* Banner canvas — 4:8 (1:2) vertical ratio */}
      <div
        className="relative w-full max-w-[420px] overflow-hidden rounded-xl shadow-2xl"
        style={{ aspectRatio: "1/2" }}
      >
        {/* Background */}
        <img
          src={bannerBg}
          alt="Banner background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(200_20%_4%/0.9)] via-[hsl(200_20%_4%/0.6)] to-[hsl(200_20%_4%/0.95)]" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-10">
          {/* Top: Brand */}
          <div className="text-center">
            <div className="mx-auto mb-3 h-px w-12 bg-primary/50" />
            <h1 className="font-display text-3xl font-extrabold tracking-wider text-foreground md:text-4xl">
              {BANNER.brandName}
            </h1>
            <p className="mt-2 font-body text-xs tracking-[0.2em] text-primary">
              {BANNER.tagline}
            </p>
            <div className="mx-auto mt-3 h-px w-12 bg-primary/50" />
          </div>

          {/* Middle: Wellness concepts */}
          <div className="my-auto space-y-4 py-8">
            {BANNER.concepts.map((concept, i) => (
              <div key={i} className="text-center">
                <h3 className="font-display text-lg font-bold text-foreground md:text-xl">
                  {concept.text}
                </h3>
                <p className="mx-auto mt-1 max-w-[260px] font-body text-[11px] leading-relaxed text-muted-foreground">
                  {concept.description}
                </p>
                {i < BANNER.concepts.length - 1 && (
                  <div className="mx-auto mt-4 h-px w-8 bg-primary/20" />
                )}
              </div>
            ))}
          </div>

          {/* Bottom: CTA + Contact */}
          <div className="text-center">
            <p className="mb-1 font-display text-xl font-bold text-primary">
              {BANNER.cta}
            </p>
            <p className="font-body text-sm font-medium text-foreground">
              {BANNER.date}
            </p>
            <p className="mt-0.5 font-body text-xs text-muted-foreground">
              {BANNER.location}
            </p>

            <div className="mx-auto my-4 h-px w-16 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="space-y-1">
              <p className="font-body text-[10px] text-muted-foreground">
                {BANNER.website}
              </p>
              <p className="font-body text-[10px] text-muted-foreground">
                {BANNER.instagram} · {BANNER.phone}
              </p>
              <p className="font-body text-[10px] text-muted-foreground">
                {BANNER.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlyerBanner;
