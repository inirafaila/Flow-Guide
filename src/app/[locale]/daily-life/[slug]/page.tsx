import { notFound } from "next/navigation";
import { GuidePageTemplate } from "@/features/routes/page-type-templates";
import { DAILY_LIFE_SLUGS, isSlug } from "@/lib/routes";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return DAILY_LIFE_SLUGS.map((slug) => ({ slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!isSlug(slug, DAILY_LIFE_SLUGS)) notFound();
  return <GuidePageTemplate path={`/daily-life/${slug}`} />;
}
