"use client";

import { useEffect, useRef } from "react";

/**
 * Thin reading-progress bar. Rendered through the Navbar's `accessory` slot so
 * it hangs off the header's bottom edge and follows the nav as it shrinks on
 * scroll, rather than guessing the header height.
 */
export default function ReadingProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const de = document.documentElement;
        const max = de.scrollHeight - de.clientHeight;
        const p = max > 0 ? de.scrollTop / max : 0;
        if (progressRef.current) progressRef.current.style.width = `${p * 100}%`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="h-[3px] w-full bg-border">
      <div
        ref={progressRef}
        className="h-full w-0 bg-green transition-[width] duration-100 ease-linear"
      />
    </div>
  );
}
