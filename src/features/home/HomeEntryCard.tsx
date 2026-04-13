import Link from "next/link";
import { Card } from "@/components/ui/Card";

export type HomeEntryCardProps = {
  href: string;
  title: string;
  description: string;
};

/**
 * Single entry-point card for the Home page (newcomer / work / housing hubs).
 */
export function HomeEntryCard({ href, title, description }: HomeEntryCardProps) {
  return (
    <Card as="article" className="home-entry-cards__card">
      <Link href={href} className="home-entry-cards__link">
        <h3 className="home-entry-cards__title">{title}</h3>
        <p className="home-entry-cards__desc muted">{description}</p>
      </Link>
    </Card>
  );
}
