import { notFound } from "next/navigation";
import { RoutePlaceholder } from "@/features/routes/RoutePlaceholder";
import { DOCUMENT_SLUGS, isSlug } from "@/lib/routes";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return DOCUMENT_SLUGS.map((slug) => ({ slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!isSlug(slug, DOCUMENT_SLUGS)) notFound();
  return <RoutePlaceholder path={`/documents/${slug}`} />;
}
