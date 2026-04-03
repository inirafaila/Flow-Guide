import type { ReactNode } from "react";

export type CardProps = {
  as?: "section" | "article";
  className?: string;
  children: ReactNode;
};

/**
 * Minimal bordered placeholder container for Phase 1 template shells.
 */
export function Card({
  as: Tag = "section",
  className = "",
  children,
}: CardProps) {
  const merged = `fg-card ${className}`.trim();
  return <Tag className={merged}>{children}</Tag>;
}
