"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import Container from "./Container";
import type { Link as LinkValue, NavItem } from "@/sanity/lib/types";

type NavbarProps = {
  siteName: string;
  logoMark?: string | null;
  links?: NavItem[] | null;
  cta?: LinkValue | null;
};

export default function Navbar({
  siteName,
  logoMark,
  links = [],
  cta,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  /** Label of the open dropdown, or null. Only one can be open at a time. */
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A dropdown left open would otherwise hang over the page after a click
  // outside it or an Escape press.
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
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
          {logoMark && <span className="text-green">{logoMark}</span>} {siteName}
        </Link>
        {!!links?.length && (
          <nav
            ref={navRef}
            className="hidden items-center gap-8 font-body text-sm font-semibold text-nav sm:flex"
          >
            {links.map((item) =>
              item._type === "navGroup" ? (
                <NavDropdown
                  key={`group-${item.label}`}
                  label={item.label}
                  links={item.links}
                  pathname={pathname}
                  open={openMenu === item.label}
                  onOpen={() => setOpenMenu(item.label)}
                  onToggle={() =>
                    setOpenMenu((current) =>
                      current === item.label ? null : item.label,
                    )
                  }
                  onClose={() => setOpenMenu(null)}
                />
              ) : (
                <NavLink
                  key={`${item.href}-${item.label}`}
                  link={item}
                  isActive={item.href === pathname}
                />
              ),
            )}
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

/** The underline wipes in on hover and stays put on the current page. */
function NavLink({ link, isActive }: { link: LinkValue; isActive: boolean }) {
  return (
    <a
      href={link.href}
      target={link.openInNewTab ? "_blank" : undefined}
      rel={link.openInNewTab ? "noopener noreferrer" : undefined}
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
}

function NavDropdown({
  label,
  links,
  pathname,
  open,
  onOpen,
  onToggle,
  onClose,
}: {
  label: string;
  links: LinkValue[];
  pathname: string;
  open: boolean;
  onOpen: () => void;
  onToggle: () => void;
  onClose: () => void;
}) {
  // The trigger is not a destination, so the current page is signalled by one of
  // its children matching instead.
  const isActive = links.some((link) => link.href === pathname);

  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={onToggle}
        className={`group relative flex items-center gap-1.5 py-1 font-semibold hover:text-green ${
          isActive || open ? "text-green" : ""
        }`}
      >
        {label}
        <svg
          viewBox="0 0 10 6"
          aria-hidden="true"
          className={`h-[6px] w-[10px] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M1 1l4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-green transition-transform duration-200 ease-out group-hover:scale-x-100 ${
            isActive ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </button>

      {open && (
        // Pulled up under the trigger with a padded lip so the pointer can cross
        // the gap without the menu closing under it.
        <div className="absolute left-1/2 top-full z-10 -translate-x-1/2 pt-3">
          <div className="min-w-[228px] rounded-xl border border-border bg-white p-2 shadow-[0_14px_36px_rgba(28,27,25,0.12)]">
            {links.map((link) => (
              <a
                key={`${link.href}-${link.label}`}
                href={link.href}
                target={link.openInNewTab ? "_blank" : undefined}
                rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                onClick={onClose}
                className={`block rounded-lg px-3 py-2 hover:bg-green-bg hover:text-green ${
                  link.href === pathname ? "text-green" : ""
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
