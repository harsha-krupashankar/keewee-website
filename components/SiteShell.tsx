import Footer from "./Footer";
import Navbar from "./Navbar";
import { getSiteSettings } from "@/sanity/lib/content";
import type { FetchOptions } from "@/sanity/lib/live";
import type { Link as LinkValue } from "@/sanity/lib/types";

/**
 * Header + footer wrapper for every page.
 *
 * Fetching site settings here rather than in each page keeps the chrome to one
 * query definition; the `'use cache'` boundary inside `getSiteSettings` means
 * the extra call per route costs nothing after the first render.
 */
export default async function SiteShell({
  opts,
  children,
  mainClassName = "bg-paper",
  minimalNav = false,
  navCta,
}: {
  opts: FetchOptions;
  children: React.ReactNode;
  mainClassName?: string;
  minimalNav?: boolean;
  /** Overrides the global header button, e.g. on the free audit landing page. */
  navCta?: LinkValue | null;
}) {
  const settings = await getSiteSettings(opts);

  return (
    <>
      <Navbar
        siteName={settings?.title ?? "keewee.in"}
        links={settings?.headerNav}
        cta={navCta ?? settings?.headerCta}
        minimal={minimalNav}
      />
      <main className={mainClassName}>{children}</main>
      <Footer settings={settings} />
    </>
  );
}
