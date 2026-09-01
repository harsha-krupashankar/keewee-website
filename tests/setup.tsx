/**
 * `sanity/env.ts` reads `process.env` at module scope and throws on a missing
 * variable, and `SanityImage` pulls it in transitively. Browser mode has no
 * `process` at all, so it is shimmed here — setup runs before the test file's
 * module graph is evaluated.
 */
const g = globalThis as unknown as { process?: { env: Record<string, string> } };
g.process ??= { env: {} };
g.process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??= "test-project";
g.process.env.NEXT_PUBLIC_SANITY_DATASET ??= "test";

import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

/**
 * `next/link` and `next/image` both reach for App Router internals that do not
 * exist outside a running Next server. Both are stubbed to the plain elements
 * they render to in the browser, so tests assert on this project's own markup
 * rather than on Next's.
 */
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: { href: string; children: React.ReactNode } & Record<string, unknown>) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    width,
    height,
    className,
  }: Record<string, unknown>) => (
    // Next-only props (priority, blurDataURL, sizes…) are dropped rather than
    // forwarded: React warns about unknown attributes on a plain <img>.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src as string}
      alt={alt as string}
      width={width as number}
      height={height as number}
      className={className as string}
    />
  ),
}));

afterEach(() => cleanup());
