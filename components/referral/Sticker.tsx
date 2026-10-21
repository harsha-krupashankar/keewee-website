/** The tilted Bangers label from the design system, e.g. “Up to $150!”. */
export default function Sticker({
  children,
  tone = "lime",
  size = "small",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "lime" | "green";
  size?: "small" | "medium";
  className?: string;
}) {
  const toneClass = tone === "green" ? "bg-green text-white" : "bg-lime text-ink";
  const sizeClass = size === "medium" ? "px-4 py-1.5 text-2xl" : "px-3 py-1 text-base";
  return (
    <span
      className={`inline-block -rotate-[4deg] whitespace-nowrap rounded font-sticker leading-[1.1] tracking-[0.02em] shadow-[2px_2px_0_#1C1B19] ${toneClass} ${sizeClass} ${className}`}
    >
      {children}
    </span>
  );
}
