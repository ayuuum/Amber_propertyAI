import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-cta text-white hover:bg-ink border border-cta shadow-sm",
  secondary:
    "bg-cream-alt text-ink hover:bg-cream-alt/80 border border-ink/20",
  outline:
    "bg-transparent text-ink border-2 border-ink hover:bg-ink hover:text-cream-light",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", href, children, className = "", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ink/20 focus:ring-offset-2 disabled:opacity-50";

    const styles = `${base} ${variantStyles[variant]} ${className}`;

    if (href) {
      return (
        <a href={href} className={styles}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={styles} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
