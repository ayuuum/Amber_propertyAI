import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl bg-white p-6 shadow-sm border border-cream-alt/50 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
