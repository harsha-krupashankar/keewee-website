export default function Marquee({ text }: { text?: string }) {
  if (!text) return null;

  return (
    <div className="group overflow-hidden border-y border-border bg-ink py-3 text-paper">
      <div className="flex w-max animate-marquee font-display text-[13px] font-bold uppercase tracking-[0.16em] [word-spacing:0.4em] transition-[color] duration-300 group-hover:[animation-play-state:paused] group-hover:text-lime">
        {/* Duplicated so the loop has no visible seam. */}
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}
