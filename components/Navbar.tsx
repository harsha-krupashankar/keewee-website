"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "./Button";
import Container from "./Container";
import type { Link as LinkValue } from "@/sanity/lib/types";

type NavbarProps = {
  siteName: string;
  links?: LinkValue[] | null;
  cta?: LinkValue | null;
  /** Landing pages drop the nav links so a single CTA carries the page. */
  minimal?: boolean;
};

export default function Navbar({
  siteName,
  links = [],
  cta,
  minimal = false,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
          <span className="text-green">✱</span> {siteName}
        </Link>
        {!minimal && !!links?.length && (
          <nav className="hidden gap-8 font-body text-sm font-semibold text-nav sm:flex">
            {links.map((link) => {
              const isActive = link.href === pathname;
              return (
                <a
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  className={`group relative py-1 hover:text-green ${
                    isActive ? "text-green" : ""
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-green transition-transform duration-200 ease-out group-hover:scale-x-100 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>
        )}
        {cta && (
          <Button href={cta.href} className="px-5 py-2.5 text-sm">
            {cta.label}
          </Button>
        )}
      </Container>
    </header>
  );
}
