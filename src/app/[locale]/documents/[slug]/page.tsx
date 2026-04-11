import path from "node:path";
import { notFound } from "next/navigation";
import {
  CalculatorPageTemplate,
  GuidePageTemplate,
} from "@/features/routes/page-type-templates";
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
    return <CalculatorPageTemplate path={routePath} />;
  }
  const contentRoot = path.join(process.cwd(), "src", "content");
  const trust = loadTrustDataForPage(contentRoot, slug);
  return (
    <GuidePageTemplate
      path={routePath}
      sources={trust.sources}
      lastVerifiedAt={trust.lastVerifiedAt}
      whatMayVary={trust.whatMayVary}
    />
  );
}
