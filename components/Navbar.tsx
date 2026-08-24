"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import Button from "./Button";
import Container from "./Container";
import LogoMark from "./LogoMark";
import { safeHref } from "@/lib/safe-href";
import type { Link as LinkValue, NavItem } from "@/sanity/lib/types";

type NavbarProps = {
  siteName: string;
  links?: NavItem[] | null;
  cta?: LinkValue | null;
};

export default function Navbar({
  siteName,
  links = [],
  cta,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  /** Label of the open dropdown, or null. Only one can be open at a time. */
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
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
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // The panel covers the page, so background scrolling would just fight it.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

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
          <LogoMark className="text-green" />
          {siteName}
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
        <div className="flex items-center gap-2.5">
          {cta && (
            <Button href={cta.href} className="hidden px-5 py-2.5 text-sm sm:inline-block">
              {cta.label}
            </Button>
          )}
          {!!links?.length && (
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((open) => !open)}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-border text-ink sm:hidden"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                {mobileOpen ? (
                  <path
                    d="M5 5l14 14M19 5L5 19"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          )}
        </div>
      </Container>

      {!!links?.length && (
        <div
          id="mobile-nav-panel"
          className={`overflow-hidden border-t border-border bg-paper transition-[grid-template-rows] duration-300 ease-in-out sm:hidden ${
            mobileOpen ? "grid grid-rows-[1fr]" : "grid grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <Container className="flex flex-col gap-1 py-4 font-body text-base font-semibold text-nav">
              {links.map((item) =>
                item._type === "navGroup" ? (
                  <div key={`mobile-group-${item.label}`} className="py-1.5">
                    <div className="mb-1 font-display text-xs font-bold uppercase tracking-wide text-faint">
                      {item.label}
                    </div>
                    <div className="flex flex-col">
                      {item.links.map((link) => (
                        <MobileNavLink
                          key={`${link.href}-${link.label}`}
                          link={link}
                          isActive={link.href === pathname}
                          onNavigate={() => setMobileOpen(false)}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <MobileNavLink
                    key={`${item.href}-${item.label}`}
                    link={item}
                    isActive={item.href === pathname}
                    onNavigate={() => setMobileOpen(false)}
                  />
                ),
              )}
              {cta && (
                <Button
                  href={cta.href}
                  className="mt-3 px-5 py-3 text-center text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  {cta.label}
                </Button>
              )}
            </Container>
          </div>
        </div>
      )}
    </header>
  );
}

function MobileNavLink({
  link,
  isActive,
  onNavigate,
}: {
  link: LinkValue;
  isActive: boolean;
  onNavigate: () => void;
}) {
  return (
    <a
      href={safeHref(link.href)}
      target={link.openInNewTab ? "_blank" : undefined}
      rel={link.openInNewTab ? "noopener noreferrer" : undefined}
      onClick={onNavigate}
      className={`rounded-lg px-2.5 py-2.5 ${isActive ? "text-green" : "hover:text-green"}`}
    >
      {link.label}
    </a>
  );
}

/** The underline wipes in on hover and stays put on the current page. */
function NavLink({ link, isActive }: { link: LinkValue; isActive: boolean }) {
  return (
    <a
      href={safeHref(link.href)}
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
  const menuId = useId();

  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
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
        <div id={menuId} className="absolute left-1/2 top-full z-10 -translate-x-1/2 pt-3">
          <div className="min-w-[228px] rounded-xl border border-border bg-white p-2 shadow-[0_14px_36px_rgba(28,27,25,0.12)]">
            {links.map((link) => (
              <a
                key={`${link.href}-${link.label}`}
                href={safeHref(link.href)}
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
