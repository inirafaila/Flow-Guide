import { notFound } from "next/navigation";
import { GuidePageTemplate } from "@/features/routes/page-type-templates";
import { NEWCOMER_SLUGS, isSlug } from "@/lib/routes";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return NEWCOMER_SLUGS.map((slug) => ({ slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!isSlug(slug, NEWCOMER_SLUGS)) notFound();
  return <GuidePageTemplate path={`/newcomer/${slug}`} />;
}
