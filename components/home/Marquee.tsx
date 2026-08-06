/**
 * The track animates by -50%, so each half has to be wider than the viewport
 * or a blank gap scrolls through. Copy count is derived from the string length
 * (~11px per character at this size) against a generous viewport assumption.
 */
const TRACK_HALF_WIDTH = 2800;
const CHAR_WIDTH = 11;

export default function Marquee({ text }: { text?: string }) {
  if (!text) return null;

  const copies = Math.max(
    2,
    Math.ceil(TRACK_HALF_WIDTH / (text.length * CHAR_WIDTH)),
  );
  // A trailing space would collapse at the span boundary, butting the last item
  // of one copy against the first of the next. A no-break space keeps the gap
  // and still picks up `word-spacing`, so every join matches the inner rhythm.
  const item = `${text.trim()} `;
  const half = Array.from({ length: copies }, (_, i) => (
    <span key={i} className="shrink-0 whitespace-nowrap">
      {item}
    </span>
  ));

  return (
    <div className="group overflow-hidden border-y border-border bg-ink py-3 text-paper">
      <div
        // The keyframe timing is authored for a single copy per half; a longer
        // track needs a proportional duration or the scroll speeds up.
        style={{ animationDuration: `${copies * 44}s` }}
        className="flex w-max animate-marquee font-display text-[13px] font-bold uppercase tracking-[0.16em] [word-spacing:0.4em] transition-[color] duration-300 group-hover:[animation-play-state:paused] group-hover:text-lime"
      >
        <div className="flex shrink-0">{half}</div>
        {/* Duplicated so the loop has no visible seam. */}
        <div className="flex shrink-0" aria-hidden="true">
          {half}
        </div>
      </div>
    </div>
  );
}
