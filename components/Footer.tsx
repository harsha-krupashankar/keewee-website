import Link from "next/link";
import Container from "./Container";
import { footerCompany, footerOffer } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white py-8">
      <Container>
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-[280px]">
            <div className="flex items-center gap-2 font-display text-[23px] font-extrabold tracking-[-0.03em] text-ink">
              <span className="text-green">✱</span> keewee.in
            </div>
            <p className="my-2.5 font-display text-lg font-extrabold tracking-[-0.02em] text-ink">
              B2B marketing with a spine.
            </p>
            <a
              href="mailto:team@keewee.in"
              className="border-b-2 border-lime font-display text-sm font-bold text-green"
            >
              team@keewee.in
            </a>
          </div>

          <div className="flex flex-wrap gap-11 font-body text-sm">
            <div>
              <div className="mb-3 font-display text-xs font-bold uppercase tracking-wide text-ink">
                What we offer
              </div>
              <div className="flex flex-col gap-2 font-medium text-body">
                {footerOffer.map((item) => (
                  <a key={item} href="#full-funnel" className="hover:text-green">
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-3 font-display text-xs font-bold uppercase tracking-wide text-ink">
                Company
              </div>
              <div className="flex flex-col gap-2 font-medium text-body">
                {footerCompany.map((item) => (
                  <Link key={item.label} href={item.href} className="hover:text-green">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-border pt-4 font-mono text-[11px] font-bold uppercase tracking-wide text-faint">
          <span>© 2026 Keewee Marketing Pvt Ltd.</span>
          <span>Sharp positioning · Real pipeline · Honest results</span>
        </div>
      </Container>
    </footer>
  );
}
