import { notFound } from "next/navigation";
import { RoutePlaceholder } from "@/features/routes/RoutePlaceholder";
import { PAYMENTS_SLUGS, isSlug } from "@/lib/routes";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PAYMENTS_SLUGS.map((slug) => ({ slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!isSlug(slug, PAYMENTS_SLUGS)) notFound();
  return <RoutePlaceholder path={`/payments/${slug}`} />;
}
