import bannerBg from "@/assets/flyer-banner-bg.jpg";

/* ─── EDITABLE CONTENT ─── */
const BANNER = {
  brandName: "COPPAHANDGOLD",
  tagline: "Redefining the Wellness Experience",
  concepts: [
    "Science Meets Sweat",
    "Science You Can Sip",
    "Move With Intention",
    "Mind · Body · Biology",
  ],
  date: "28 — 29 March, 2026",
  location: "Abuja, Nigeria",
  website: "www.coppahandgold.com",
  instagram: "@coppahandgold",
  phone: "+234 000 000 0000",
};
/* ─── END EDITABLE ─── */

const FlyerBanner = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 md:p-8">
      {/* 1:2 vertical banner */}
      <div
        className="relative w-full max-w-[420px] overflow-hidden rounded-xl shadow-2xl"
        style={{ aspectRatio: "1/2" }}
      >
        {/* Background — pushed far back */}
        <img
          src={bannerBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(200_20%_6%/0.95)] via-[hsl(200_20%_6%/0.85)] to-[hsl(200_20%_6%/0.95)]" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-between py-12 px-8 text-center">
          {/* Top — Brand */}
          <div>
            <div className="mx-auto mb-4 h-px w-10 bg-primary/40" />
            <h1 className="font-display text-2xl font-extrabold tracking-[0.2em] text-foreground md:text-3xl">
              {BANNER.brandName}
            </h1>
            <p className="mt-2 font-body text-[10px] tracking-[0.3em] text-primary/70">
              {BANNER.tagline}
            </p>
            <div className="mx-auto mt-4 h-px w-10 bg-primary/40" />
          </div>

          {/* Middle — Wellness concepts, spaced and quiet */}
          <div className="flex flex-col items-center gap-6">
            {BANNER.concepts.map((concept) => (
              <p
                key={concept}
                className="font-display text-base font-semibold tracking-[0.1em] text-foreground/80 md:text-lg"
              >
                {concept}
              </p>
            ))}
          </div>

          {/* Bottom — Date + Contact */}
          <div>
            <p className="font-display text-lg font-bold text-foreground md:text-xl">
              {BANNER.date}
            </p>
            <p className="mt-1 font-body text-xs text-foreground/50">
              {BANNER.location}
            </p>

            <div className="mx-auto my-5 h-px w-12 bg-foreground/10" />

            <div className="space-y-1">
              <p className="font-body text-[10px] text-foreground/40">
                {BANNER.website}
              </p>
              <p className="font-body text-[10px] text-foreground/40">
                {BANNER.instagram} · {BANNER.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlyerBanner;
