import Link from "next/link";

export type HomeQuickToolItemProps = {
  href: string;
  label: string;
  className?: string;
};

/**
 * Single quick-tool link row for the Home page utilities grid.
 */
export function HomeQuickToolItem({
  href,
  label,
  className = "home-quick-tools__item",
}: HomeQuickToolItemProps) {
  return (
    <Link href={href} className={className}>
      <span className="home-quick-tools__label">{label}</span>
      <span className="home-quick-tools__arrow" aria-hidden>
        →
      </span>
    </Link>
  );
}
