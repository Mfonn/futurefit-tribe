import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import bioBarImg from "@/assets/bio-bar.jpg";

const elixirs = [
{
  name: "Bloom",
  ingredients: "Floral notes · citrus · sparkling finish",
  benefit: "Calming & refreshing",
  color: "bg-warm-rose"
},
{
  name: "Crimson",
  ingredients: "Deep berry blend · spiced botanicals · tangy base",
  benefit: "Antioxidant-rich recovery",
  color: "bg-primary"
},
{
  name: "Morning Signal",
  ingredients: "Warming aromatics · root spices · natural sweetness",
  benefit: "Digestive & energising",
  color: "bg-bio-green"
},
{
  name: "Mint Elixir",
  ingredients: "Cool herbs · aloe base · fresh citrus",
  benefit: "Cooling & gut-friendly",
  color: "bg-bio-teal"
}];


const BioBarSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="bio-bar" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/5 blur-[150px]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image side */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative">
            
            <div className="overflow-hidden rounded-2xl">
              <img
                src={bioBarImg}
                alt="The Bio Bar"
                className="h-full w-full object-cover" />
              
            </div>
            <div className="absolute -bottom-4 -right-4 rounded-xl glow-border bg-card p-4 md:p-6">
              <p className="font-body text-xs tracking-[0.2em] text-primary">
                FRESHLY MADE
              </p>
              <p className="mt-1 font-display text-2xl font-bold">​</p>
              <p className="font-body text-sm text-muted-foreground">Wellness Infusions

              </p>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}>
            
            <p className="mb-4 font-body text-sm tracking-[0.3em] text-primary">
              THE BIO BAR
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight md:text-5xl">
              Drinks engineered for your{" "}
              <span className="glow-text">biology</span>
            </h2>
            <p className="mb-10 font-body text-base leading-relaxed text-muted-foreground">
              Forget cocktails. Our bio-bar serves fresh herbal drinks made on-site. Simple herbs like lemongrass, chamomile, and hibiscus mixed with natural sweetness and fruit notes. Drinks that taste amazing and actually help.
            

            </p>

            <div className="space-y-4">
              {elixirs.map((elixir, i) =>
              <motion.div
                key={elixir.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="glass-card group flex items-start gap-4 p-4 transition-all duration-300 hover:border-primary/40">
                
                  <div
                  className={`mt-1 h-2 w-2 rounded-full ${elixir.color} pulse-glow flex-shrink-0`} />
                
                  <div>
                    <h4 className="font-display text-base font-semibold">
                      {elixir.name}
                    </h4>
                    <p className="mt-1 font-body text-xs text-muted-foreground">
                      {elixir.ingredients}
                    </p>
                    <p className="mt-1 font-body text-xs text-primary">
                      {elixir.benefit}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

};

export default BioBarSection;