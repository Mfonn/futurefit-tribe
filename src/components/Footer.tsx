const Footer = () => {
  return (
    <footer className="border-t border-border/30 px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <p className="font-display text-lg font-bold tracking-wider">
          <span className="glow-text">COPPAHANDGOLD</span>
        </p>
        <p className="font-body text-xs text-muted-foreground">
          © 2026 CoppahandGold. Abuja, Nigeria. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="https://www.instagram.com/coppahandgold?igsh=MXVpNXl0ZndjNWlnNA%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            Instagram
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            Twitter
          </a>
          <a
            href="mailto:business@coppahandgold.org"
            className="font-body text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
