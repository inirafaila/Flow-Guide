import Link from "next/link";

export type HomeQuickToolItemProps = {
  href: string;
  label: string;
};

/**
 * Single quick-tool link row for the Home page utilities grid.
 */
export function HomeQuickToolItem({ href, label }: HomeQuickToolItemProps) {
  return (
    <Link href={href} className="home-quick-tools__item">
      <span className="home-quick-tools__label">{label}</span>
      <span className="home-quick-tools__arrow" aria-hidden>
        →
      </span>
    </Link>
  );
}
