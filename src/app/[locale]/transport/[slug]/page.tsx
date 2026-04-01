import { notFound } from "next/navigation";
import { RoutePlaceholder } from "@/features/routes/RoutePlaceholder";
import { TRANSPORT_SLUGS, isSlug } from "@/lib/routes";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TRANSPORT_SLUGS.map((slug) => ({ slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!isSlug(slug, TRANSPORT_SLUGS)) notFound();
  return <RoutePlaceholder path={`/transport/${slug}`} />;
}
