"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 22,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <div
      ref={ref}
      className={`transition duration-700 ease-out ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
