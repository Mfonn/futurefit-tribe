import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

const flyers = [
  {
    name: "Main Event Flyer",
    description: "The complete CoppahandGold experience — tennis, pilates, and wellness.",
    file: "/flyers/coppahandgold-main-flyer.jpg",
    category: "HERO",
  },
  {
    name: "Tennis Experience",
    description: "Competitive doubles tournament on professional blue hard courts.",
    file: "/flyers/coppahandgold-tennis-flyer.jpg",
    category: "TENNIS",
  },
  {
    name: "Movement & Restoration",
    description: "Pilates, yoga, and guided movement sessions.",
    file: "/flyers/coppahandgold-pilates-flyer.jpg",
    category: "PILATES",
  },
  {
    name: "The Bio Bar",
    description: "Six herbal elixirs — fresh, on-site, secret recipes.",
    file: "/flyers/coppahandgold-biobar-flyer.jpg",
    category: "BIO BAR",
  },
];

const Downloads = () => {
  const navigate = useNavigate();

  const handleDownload = async (file: string, name: string) => {
    try {
      const response = await fetch(file);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${name.toLowerCase().replace(/\s+/g, "-")}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

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
              Download premium event flyers for CoppahandGold. Use these for
              sharing on social media, print materials, or partner communications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Flyers Grid */}
      <section className="section-padding pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            {flyers.map((flyer, index) => (
              <motion.div
                key={flyer.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card overflow-hidden"
              >
                <div className="relative aspect-[9/16] overflow-hidden bg-background/50">
                  <img
                    src={flyer.file}
                    alt={flyer.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <span className="mb-2 inline-block rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-body text-[10px] tracking-[0.2em] text-primary">
                    {flyer.category}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold">
                    {flyer.name}
                  </h3>
                  <p className="mt-2 font-body text-sm text-muted-foreground">
                    {flyer.description}
                  </p>

                  <Button
                    onClick={() => handleDownload(flyer.file, flyer.name)}
                    className="mt-4 w-full gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Download className="h-4 w-4" />
                    Download Flyer
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
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
            <h3 className="mb-4 font-display text-lg font-bold">Usage Guidelines</h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              These flyers are for CoppahandGold event promotion only. Please do
              not modify the designs or remove branding. For press inquiries or
              custom assets, contact the event team.
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
