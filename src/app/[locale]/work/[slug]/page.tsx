import { notFound } from "next/navigation";
import { GuidePageTemplate } from "@/features/routes/page-type-templates";
import { WORK_SLUGS, isSlug } from "@/lib/routes";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return WORK_SLUGS.map((slug) => ({ slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!isSlug(slug, WORK_SLUGS)) notFound();
  return <GuidePageTemplate path={`/work/${slug}`} />;
}
