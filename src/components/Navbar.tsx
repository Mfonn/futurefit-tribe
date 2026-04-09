import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isIndex = location.pathname === "/";

  const navItems = [
    { label: "Home", href: "/home" },
    { label: "Experience", href: "/experience" },
    { label: "Bio Bar", href: isIndex ? "#bio-bar" : "/#bio-bar" },
    { label: "Movement", href: isIndex ? "#movement" : "/#movement" },
    { label: "About", href: "/about" },
  ];

  const isRouteLink = (href: string) => href.startsWith("/") && !href.startsWith("/#");

  const isActive = (href: string) => {
    if (href === "/home") return location.pathname === "/home";
    if (href === "/experience") return location.pathname === "/experience";
    if (href === "/about") return location.pathname === "/about";
    return false;
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" as const }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="font-display text-xl font-bold tracking-wider">
          <span className="glow-text">COPPAHANDGOLD</span>
        </Link>

        <div className="hidden items-center gap-8 font-body text-sm tracking-wide md:flex">
          {navItems.map((item) =>
            isRouteLink(item.href) ? (
              <Link
                key={item.label}
                to={item.href}
                className={`transition-colors duration-300 hover:text-primary ${
                  isActive(item.href) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                {item.label}
              </a>
            )
          )}
        </div>

        <Link
          to="/experience"
          className="glass-card px-5 py-2 font-body text-sm font-medium text-primary transition-all duration-300 hover:shadow-[0_0_30px_hsl(165_80%_45%/0.3)]"
        >
          See Events
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
