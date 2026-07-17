import { ReactNode } from "react";

export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-[1180px] px-6 sm:px-10 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
