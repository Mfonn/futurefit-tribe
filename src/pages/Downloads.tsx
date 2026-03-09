import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

const flyerPages = [
  {
    name: "Event Overview Flyer",
    description: "The complete CoppahandGold experience — all activities, event details, date, venue, and contact on a single flyer.",
    route: "/flyer/main",
    category: "MAIN FLYER",
  },
  {
    name: "Social Media Post",
    description: "Instagram & TikTok-ready promotional graphic. Premium tennis-court visual with floating event details.",
    route: "/flyer/social",
    category: "SOCIAL MEDIA",
  },
  {
    name: "Outdoor Event Banner",
    description: "4×8 vertical banner for the event venue. Taglines, wellness concepts, brand identity, and contact info.",
    route: "/flyer/banner",
    category: "EVENT BANNER",
  },
];

const Downloads = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Back nav */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate("/")}
        className="fixed left-6 top-6 z-50 flex items-center gap-2 rounded-full glass-card px-4 py-2 font-body text-sm text-foreground transition-all hover:border-primary/50 md:left-12"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </motion.button>

      {/* Hero */}
      <section className="relative pt-32 pb-16 section-padding">
        <div className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-primary/10 blur-[100px] orb-float" />
        <div className="absolute right-[15%] top-[40%] h-48 w-48 rounded-full bg-warm-rose/10 blur-[80px] orb-float-delayed" />

        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-4 flex items-center justify-center gap-2">
              <Image className="h-4 w-4 text-primary" />
              <p className="font-body text-sm tracking-[0.3em] text-primary">
                MEDIA ASSETS
              </p>
            </div>
            <h1 className="mb-6 font-display text-5xl font-bold md:text-6xl">
              Event <span className="glow-text">Flyers</span>
            </h1>
            <p className="mx-auto max-w-xl font-body text-base text-muted-foreground">
              Three editable flyer designs for CoppahandGold — an event overview,
              social media post, and outdoor event banner. All content is editable in code.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Flyer Links */}
      <section className="section-padding pb-24">
        <div className="mx-auto max-w-3xl space-y-6">
          {flyerPages.map((flyer, index) => (
            <motion.div
              key={flyer.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card overflow-hidden p-6 md:p-8 transition-all duration-300 hover:border-primary/40"
            >
              <span className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-body text-[10px] tracking-[0.2em] text-primary">
                {flyer.category}
              </span>
              <h3 className="mt-2 font-display text-xl font-bold">
                {flyer.name}
              </h3>
              <p className="mt-2 font-body text-sm text-muted-foreground">
                {flyer.description}
              </p>

              <Button
                onClick={() => navigate(flyer.route)}
                className="mt-5 gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <ExternalLink className="h-4 w-4" />
                View Flyer
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Usage Note */}
      <section className="section-padding pb-24">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card border-primary/20 p-8 text-center"
          >
            <h3 className="mb-4 font-display text-lg font-bold">How to Export</h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              Open any flyer, then use your browser's screenshot or print-to-PDF feature to export.
              All text content is editable directly in the source code — look for the
              <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-primary">EDITABLE CONTENT</code>
              section at the top of each flyer file.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 px-6 py-12 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-display text-lg font-bold tracking-wider">
            <span className="glow-text">COPPAHANDGOLD</span>
          </p>
          <p className="font-body text-xs text-muted-foreground">
            © 2026 CoppahandGold. Abuja, Nigeria. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Downloads;
