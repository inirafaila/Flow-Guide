import { notFound } from "next/navigation";
import { GuidePageTemplate } from "@/features/routes/page-type-templates";
import { TRANSPORT_SLUGS, isSlug } from "@/lib/routes";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TRANSPORT_SLUGS.map((slug) => ({ slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!isSlug(slug, TRANSPORT_SLUGS)) notFound();
  return <GuidePageTemplate path={`/transport/${slug}`} />;
}
