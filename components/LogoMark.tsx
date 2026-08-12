type LogoMarkProps = {
  className?: string;
};

/**
 * The brand asterisk: the heavy-asterisk glyph (✱, U+2731) set in the display
 * face (Bricolage Grotesque), exactly as in the Keewee design — the font renders
 * it as a fine, tapered six-point mark. Kept as the real glyph rather than traced
 * SVG so it matches the wordmark's weight and metrics. Colour comes from the
 * caller via `text-*` utilities (green) — see Navbar and Footer.
 */
export default function LogoMark({ className }: LogoMarkProps) {
  return (
    <span aria-hidden="true" className={`font-display ${className ?? ""}`}>
      ✱
    </span>
  );
}
