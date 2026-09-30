"use client";

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  id?: string;
  /**
   * Renders visible immediately instead of waiting on the scroll observer.
   * Reserve for above-the-fold content — a hero `<h1>` in particular — so it
   * never depends on JS hydration to appear: without this, a slow or blocked
   * bundle leaves it hidden (the `.js` flag is set before hydration).
   */
  eager?: boolean;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 22,
  id,
  eager = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(eager);

  useEffect(() => {
    if (eager) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [eager]);

  return (
    <div
      ref={ref}
      id={id}
      // The hidden state lives in `globals.css` under `.js`, not inline, so
      // the server HTML never ships the content as `opacity: 0`.
      className={`kw-reveal transition duration-700 ease-out ${className}`}
      data-visible={visible || undefined}
      style={{ "--reveal-y": `${y}px`, "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
