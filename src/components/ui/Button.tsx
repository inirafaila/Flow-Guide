import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

/**
 * Thin Phase 1 shell control — primary / secondary only; no product variant matrix.
 */
export function Button({
  variant = "secondary",
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  const variantClass =
    variant === "primary" ? "fg-button fg-button--primary" : "fg-button fg-button--secondary";
  const merged = `${variantClass} ${className}`.trim();
  return <button type={type} className={merged} {...rest} />;
}
