const Footer = () => {
  return (
    <footer className="border-t border-border/30 px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <p className="font-display text-lg font-bold tracking-wider">
          <span className="glow-text">BIOLŪM</span>
        </p>
        <p className="font-body text-xs text-muted-foreground">
          © 2026 Biolūm Wellness. Abuja, Nigeria. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Instagram", "Twitter", "Email"].map((link) => (
            <a
              key={link}
              href="#"
              className="font-body text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
