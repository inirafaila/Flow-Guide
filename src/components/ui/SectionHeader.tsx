import type { ReactNode } from "react";

export type SectionHeaderProps = {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: ReactNode;
};

/**
 * Small uppercase section label for template block titles (Phase 1 structural only).
 */
export function SectionHeader({
  as: Tag = "h2",
  className = "",
  children,
}: SectionHeaderProps) {
  const merged = `fg-section-header ${className}`.trim();
  return <Tag className={merged}>{children}</Tag>;
}
