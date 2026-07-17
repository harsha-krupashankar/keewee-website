import { marqueeText } from "@/lib/data";

export default function Marquee() {
  return (
    <div className="group overflow-hidden border-y border-border bg-ink py-3 text-paper">
      <div className="flex w-max animate-marquee font-display text-[13px] font-bold uppercase tracking-[0.16em] [word-spacing:0.4em] transition-[color] duration-300 group-hover:[animation-play-state:paused] group-hover:text-lime">
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
      </div>
    </div>
  );
}
