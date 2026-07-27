export default function BlogImagePlaceholder({
  label = "Image",
  shape = "rect",
  className = "",
}: {
  label?: string;
  shape?: "rect" | "circle";
  className?: string;
}) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center border border-dashed border-border-soft bg-cream/60 ${
        shape === "circle" ? "rounded-full" : ""
      } ${className}`}
    >
      <span className="font-mono text-[11px] font-bold uppercase tracking-wide text-faint">
        {label}
      </span>
    </div>
  );
}
