import mainBg from "@/assets/flyer-main-bg.jpg";

/* ─── EDITABLE CONTENT ─── */
const EVENT = {
  name: "COPPAHANDGOLD",
  tagline: "Where Science Meets Sweat",
  date: "28th & 29th March, 2026",
  time: "8 AM — 6 PM",
  venue: "Abuja, Nigeria",
  activities: [
    { name: "Tennis", note: "All levels welcome" },
    { name: "Mat Pilates", note: "Guided movement" },
    { name: "Yoga", note: "Breathwork & flow" },
    { name: "Bio Bar", note: "Herbal elixirs" },
  ],
  website: "www.coppahandgold.com",
  instagram: "@coppahandgold",
  phone: "+234 000 000 0000",
  email: "hello@coppahandgold.com",
};
/* ─── END EDITABLE ─── */

const FlyerMain = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 md:p-8">
      <div
        className="relative w-full max-w-[540px] overflow-hidden rounded-xl shadow-2xl"
        style={{ aspectRatio: "9/16" }}
      >
        {/* Background — deeply recessed */}
        <img
          src={mainBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(200_20%_4%/0.7)] via-[hsl(200_20%_4%/0.5)] to-[hsl(200_20%_4%/0.85)]" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-10 md:p-12">
          {/* Top — Brand + Tagline */}
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-wider text-foreground md:text-4xl">
              {EVENT.name}
            </h1>
            <div className="mt-3 h-px w-10 bg-primary/50" />
            <p className="mt-3 font-body text-xs tracking-[0.25em] text-primary/80">
              {EVENT.tagline}
            </p>
          </div>

          {/* Middle — Activities, clean list */}
          <div className="space-y-5">
            {EVENT.activities.map((act, i) => (
              <div key={act.name} className="flex items-baseline gap-4">
                <span className="font-display text-lg font-bold text-foreground md:text-xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-base font-semibold text-foreground">
                    {act.name}
                  </p>
                  <p className="font-body text-[11px] text-foreground/50">
                    {act.note}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom — Date, Venue, Contact */}
          <div>
            <p className="font-display text-xl font-bold text-foreground md:text-2xl">
              {EVENT.date}
            </p>
            <p className="mt-1 font-body text-xs text-foreground/60">
              {EVENT.time} · {EVENT.venue}
            </p>

            <div className="mt-6 h-px w-full bg-foreground/10" />

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
              <p className="font-body text-[10px] text-foreground/40">
                {EVENT.website}
              </p>
              <p className="font-body text-[10px] text-foreground/40">
                {EVENT.instagram}
              </p>
              <p className="font-body text-[10px] text-foreground/40">
                {EVENT.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlyerMain;
