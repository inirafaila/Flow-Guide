import path from "node:path";
import { notFound } from "next/navigation";
import { GuidePageTemplate } from "@/features/routes/page-type-templates";
import { loadPageContent } from "@/lib/content/load-page-content";
import { loadTrustDataForPage } from "@/lib/content/load-trust-for-page";
import { PAYMENTS_SLUGS, isSlug } from "@/lib/routes";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PAYMENTS_SLUGS.map((slug) => ({ slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!isSlug(slug, PAYMENTS_SLUGS)) notFound();
  const contentRoot = path.join(process.cwd(), "src", "content");
  const trust = loadTrustDataForPage(contentRoot, slug);
  const pageContent = loadPageContent(contentRoot, slug);
  return (
    <GuidePageTemplate
      path={`/payments/${slug}`}
      bodyHtml={pageContent?.bodyHtml}
      sources={trust.sources}
      lastVerifiedAt={trust.lastVerifiedAt}
      whatMayVary={trust.whatMayVary}
    />
  );
}
