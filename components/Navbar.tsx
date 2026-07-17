"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "./Button";
import Container from "./Container";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-paper/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled
          ? "border-border shadow-[0_6px_20px_rgba(28,27,25,0.06)]"
          : "border-transparent"
      }`}
    >
      <Container
        className={`flex items-center justify-between gap-5 transition-[padding] duration-300 ${
          scrolled ? "py-3" : "py-4"
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-[22px] font-extrabold tracking-tight text-ink transition-transform duration-150 hover:-rotate-1"
        >
          <span className="text-green">✱</span> keewee.in
        </Link>
        <nav className="hidden gap-8 font-body text-sm font-semibold text-nav sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1 hover:text-green"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-green transition-transform duration-200 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <Button href="mailto:team@keewee.in" className="px-5 py-2.5 text-sm">
          Talk to us
        </Button>
      </Container>
    </header>
  );
}
