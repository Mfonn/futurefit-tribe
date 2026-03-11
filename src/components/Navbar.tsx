import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navItems = [
    { label: "Experience", href: isHome ? "#experience" : "/#experience" },
    { label: "Bio Bar", href: isHome ? "#bio-bar" : "/#bio-bar" },
    { label: "Movement", href: isHome ? "#movement" : "/#movement" },
    { label: "Location", href: isHome ? "#location" : "/#location" },
    { label: "About", href: "/about" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="/" className="font-display text-xl font-bold tracking-wider">
          <span className="glow-text">COPPAHANDGOLD</span>
        </a>

        <div className="hidden items-center gap-8 font-body text-sm tracking-wide md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href={isHome ? "#rsvp" : "/#rsvp"}
          className="glass-card px-5 py-2 font-body text-sm font-medium text-primary transition-all duration-300 hover:shadow-[0_0_30px_hsl(165_80%_45%/0.3)]"
        >
          RSVP Now
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
