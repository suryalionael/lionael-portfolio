const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header
      className="anim-fade fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-ink/70 backdrop-blur-md"
      style={{ "--d": "1.2s" } as React.CSSProperties}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-[1120px] items-center justify-between px-6"
      >
        <a
          href="#top"
          className="font-mono text-[13px] tracking-tight text-paper transition-colors hover:text-neutral-400"
        >
          <span className="sm:hidden">ls</span>
          <span className="hidden sm:inline">lionael.surya</span>
        </a>
        <ul className="flex items-center gap-5 sm:gap-7">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[13px] text-neutral-400 transition-colors hover:text-paper"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
