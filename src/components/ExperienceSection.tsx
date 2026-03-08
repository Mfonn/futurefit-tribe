import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import tennisImg from "@/assets/hero-tennis.jpg";
import yogaImg from "@/assets/yoga.jpg";
import bioBarImg from "@/assets/bio-bar.jpg";

const experiences = [
  {
    title: "Tennis",
    subtitle: "Competitive Play",
    description:
      "Rally under lights on premium courts. Whether you're a seasoned player or picking up a racket for the first time, our coaches guide you through an electrifying session.",
    image: tennisImg,
    tag: "SPORT",
    link: "/tennis",
  },
  {
    title: "Pilates & Yoga",
    subtitle: "Move. Breathe. Restore.",
    description:
      "Expert-guided mat Pilates and yoga sessions designed to ground your body, calm your nervous system, and complement the energy of the full event experience.",
    image: yogaImg,
    tag: "MOVEMENT",
    link: "/pilates",
  },
  {
    title: "Bio Bar",
    subtitle: "Science You Can Sip",
    description:
      "Our pharmacist-curated bar blends adaptogenic herbs, electrolyte complexes, and botanical extracts into drinks that target inflammation, energy, and cellular repair.",
    image: bioBarImg,
    tag: "NOURISH",
    link: null as string | null,
  },
];

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  const handleClick = () => {
    if (experience.link) {
      navigate(experience.link);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`group relative overflow-hidden rounded-2xl ${experience.link ? "cursor-pointer" : ""}`}
      onClick={handleClick}
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={experience.image}
          alt={experience.title}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background from-20% via-background/60 via-50% to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end p-6 md:p-8">
        <span className="mb-3 inline-block w-fit rounded-full border border-primary/30 px-3 py-1 font-body text-xs tracking-[0.2em] text-primary">
          {experience.tag}
        </span>
        <h3 className="mb-1 font-display text-2xl font-bold md:text-3xl">
          {experience.title}
        </h3>
        <p className="mb-2 font-display text-base text-primary">
          {experience.subtitle}
        </p>
        <div className="max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-32">
          <p className="mt-2 max-w-sm font-body text-sm leading-relaxed text-muted-foreground">
            {experience.description}
          </p>
        </div>
        {experience.link && (
          <span className="mt-3 inline-block font-body text-xs tracking-[0.2em] text-warm-rose">
            EXPLORE {experience.title.toUpperCase()} →
          </span>
        )}
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="movement" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <p className="mb-4 font-body text-sm tracking-[0.3em] text-primary">
            THE EXPERIENCE
          </p>
          <h2 className="max-w-lg font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Three pillars of{" "}
            <span className="glow-text">radical wellness</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.title} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
