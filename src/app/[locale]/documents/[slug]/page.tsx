import path from "node:path";
import { notFound } from "next/navigation";
import { StayCalculatorBlock } from "@/features/calculator/StayCalculatorBlock";
import {
  CalculatorPageTemplate,
  GuidePageTemplate,
} from "@/features/routes/page-type-templates";
import { loadPageContent } from "@/lib/content/load-page-content";
import { loadTrustDataForPage } from "@/lib/content/load-trust-for-page";
import { DOCUMENT_SLUGS, isSlug } from "@/lib/routes";
import { templateForDocumentsSlug } from "@/lib/page-type-routes";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return DOCUMENT_SLUGS.map((slug) => ({ slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!isSlug(slug, DOCUMENT_SLUGS)) notFound();
  const routePath = `/documents/${slug}`;
  if (templateForDocumentsSlug(slug) === "calculator") {
    return (
      <CalculatorPageTemplate path={routePath}>
        <StayCalculatorBlock />
      </CalculatorPageTemplate>
    );
  }
  const contentRoot = path.join(process.cwd(), "src", "content");
  const trust = loadTrustDataForPage(contentRoot, slug);
  const pageContent = loadPageContent(contentRoot, slug);
  return (
    <GuidePageTemplate
      path={routePath}
      bodyHtml={pageContent?.bodyHtml}
      sources={trust.sources}
      lastVerifiedAt={trust.lastVerifiedAt}
      whatMayVary={trust.whatMayVary}
    />
  );
}
