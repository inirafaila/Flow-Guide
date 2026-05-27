import path from "node:path";
import { notFound } from "next/navigation";
import { GuidePageTemplate } from "@/features/routes/page-type-templates";
import { loadPageContent } from "@/lib/content/load-page-content";
import { loadTrustDataForPage } from "@/lib/content/load-trust-for-page";
import { NEWCOMER_SLUGS, isSlug } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildPageMetadata(`/newcomer/${slug}`);
}

export function generateStaticParams() {
  return NEWCOMER_SLUGS.map((slug) => ({ slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!isSlug(slug, NEWCOMER_SLUGS)) notFound();
  const contentRoot = path.join(process.cwd(), "src", "content");
  const trust = loadTrustDataForPage(contentRoot, slug);
  const pageContent = loadPageContent(contentRoot, slug);
  return (
    <GuidePageTemplate
      path={`/newcomer/${slug}`}
      bodyHtml={pageContent?.bodyHtml}
      sources={trust.sources}
      lastVerifiedAt={trust.lastVerifiedAt}
      whatMayVary={trust.whatMayVary}
    />
  );
}
