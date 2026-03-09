import mainBg from "@/assets/flyer-main-bg.jpg";

/* ─── EDITABLE CONTENT ─── */
const EVENT = {
  name: "COPPAHANDGOLD",
  tagline: "Where Science Meets Sweat",
  date: "28th & 29th March, 2026",
  time: "8:00 AM — 6:00 PM",
  venue: "The Dome, Maitama — Abuja, Nigeria",
  capacity: "Limited Slots Available",
  website: "www.coppahandgold.com",
  instagram: "@coppahandgold",
  phone: "+234 000 000 0000",
  email: "hello@coppahandgold.com",
};

const ACTIVITIES = [
  {
    title: "Tennis",
    subtitle: "All Levels Welcome",
    description: "Friendly doubles on professional courts. From first-timers to seasoned players — everyone plays.",
    color: "hsl(165 80% 45%)",
  },
  {
    title: "Mat Pilates & Yoga",
    subtitle: "Move · Breathe · Restore",
    description: "Expert-led mat pilates and yoga sessions designed to ground your body and calm your nervous system.",
    color: "hsl(350 60% 72%)",
  },
  {
    title: "The Bio Bar",
    subtitle: "Science You Can Sip",
    description: "Pharmacist-curated herbal elixirs — fresh botanicals, adaptogens, and functional drinks made on-site.",
    color: "hsl(140 70% 50%)",
  },
];
/* ─── END EDITABLE ─── */

const FlyerMain = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 md:p-8">
      {/* Flyer canvas — 1080×1920 ratio */}
      <div
        className="relative w-full max-w-[540px] overflow-hidden rounded-xl shadow-2xl"
        style={{ aspectRatio: "9/16" }}
      >
        {/* Background image */}
        <img
          src={mainBg}
          alt="Event background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(200_20%_4%/0.85)] via-[hsl(200_20%_4%/0.7)] to-[hsl(200_20%_4%/0.92)]" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-10">
          {/* Top: Brand + Title */}
          <div>
            <p className="font-body text-[10px] tracking-[0.4em] text-primary/80">
              A PREMIUM WELLNESS EXPERIENCE
            </p>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-none tracking-tight text-foreground md:text-5xl">
              {EVENT.name}
            </h1>
            <p className="mt-2 font-body text-sm tracking-[0.15em] text-primary">
              {EVENT.tagline}
            </p>
          </div>

          {/* Middle: Activity cards */}
          <div className="my-auto space-y-3 py-6">
            <p className="mb-4 font-body text-[10px] tracking-[0.3em] text-muted-foreground">
              THE EXPERIENCE
            </p>
            {ACTIVITIES.map((act) => (
              <div
                key={act.title}
                className="rounded-xl border border-[hsl(200_15%_20%)] bg-[hsl(200_15%_8%/0.7)] p-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: act.color }}
                  />
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground">
                      {act.title}
                    </h3>
                    <p className="font-body text-[11px] tracking-wide" style={{ color: act.color }}>
                      {act.subtitle}
                    </p>
                  </div>
                </div>
                <p className="mt-2 pl-[22px] font-body text-[11px] leading-relaxed text-muted-foreground">
                  {act.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom: Event details + Contact */}
          <div>
            {/* Details grid */}
            <div className="mb-5 grid grid-cols-2 gap-3">
              {[
                { label: "DATE", value: EVENT.date },
                { label: "TIME", value: EVENT.time },
                { label: "VENUE", value: EVENT.venue },
                { label: "CAPACITY", value: EVENT.capacity },
              ].map((d) => (
                <div key={d.label}>
                  <p className="font-body text-[9px] tracking-[0.2em] text-primary/70">
                    {d.label}
                  </p>
                  <p className="mt-0.5 font-body text-[11px] font-medium text-foreground">
                    {d.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            {/* Contact row */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <p className="font-body text-[10px] text-muted-foreground">
                {EVENT.website}
              </p>
              <p className="font-body text-[10px] text-muted-foreground">
                {EVENT.instagram}
              </p>
              <p className="font-body text-[10px] text-muted-foreground">
                {EVENT.phone}
              </p>
            </div>
            <p className="mt-1 font-body text-[10px] text-muted-foreground">
              {EVENT.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlyerMain;
