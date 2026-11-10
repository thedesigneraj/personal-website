import Link from "next/link";

const links = [
  { href: "/#work", label: "work" },
  { href: "/#about", label: "about" },
  { href: "/#contact", label: "contact" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/0 bg-ink/70 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-10 md:px-16">
        <Link href="/" className="font-mono text-sm">
          <span className="text-lime">~/</span>sudharsan-aj
        </Link>
        <ul className="flex gap-5 font-mono text-sm text-muted sm:gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition hover:text-lime">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
