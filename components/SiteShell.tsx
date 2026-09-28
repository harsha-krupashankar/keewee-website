import CookieConsent from "./consent/CookieConsent";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { getSiteSettings } from "@/sanity/lib/content";
import type { FetchOptions } from "@/sanity/lib/live";

/**
 * Header + footer wrapper for every page.
 *
 * Fetching site settings here rather than in each page keeps the chrome to one
 * query definition; the `'use cache'` boundary inside `getSiteSettings` means
 * the extra call per route costs nothing after the first render.
 *
 * The chrome is deliberately not configurable: every route gets the same nav
 * links, the same header button, and the same footer, all straight from Site
 * settings. `mainClassName` sets the page background behind the sections;
 * `navAccessory` hangs a strip (e.g. a reading-progress bar) off the header's
 * bottom edge.
 */
export default async function SiteShell({
  opts,
  children,
  mainClassName = "bg-paper",
  navAccessory,
}: {
  opts: FetchOptions;
  children: React.ReactNode;
  mainClassName?: string;
  navAccessory?: React.ReactNode;
}) {
  const settings = await getSiteSettings(opts);

  return (
    <>
      <Navbar
        siteName={settings?.title ?? "keewee.in"}
        links={settings?.headerNav}
        cta={settings?.headerCta}
        accessory={navAccessory}
      />
      <main id="main-content" className={mainClassName}>
        {children}
      </main>
      <Footer settings={settings} />
      <CookieConsent content={settings?.cookieConsent} />
    </>
  );
}
