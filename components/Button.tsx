import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  if (variant === "ghost") {
    return (
      <Link
        href={href}
        className={`inline-block rounded-xl border-2 border-white/40 font-display font-bold text-paper transition-colors duration-150 hover:bg-paper hover:text-ink ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`inline-block rounded-xl bg-green font-display font-bold text-white shadow-[3px_3px_0_#1C1B19] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#1C1B19] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lime-bright focus-visible:outline-offset-[3px] ${className}`}
    >
      {children}
    </Link>
  );
}
