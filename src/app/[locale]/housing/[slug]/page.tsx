import path from "node:path";
import { notFound } from "next/navigation";
import {
  GuidePageTemplate,
  ServiceFormPageTemplate,
} from "@/features/routes/page-type-templates";
import { loadPageContent } from "@/lib/content/load-page-content";
import { loadTrustDataForPage } from "@/lib/content/load-trust-for-page";
import { HOUSING_SLUGS, isSlug } from "@/lib/routes";
import { templateForHousingSlug } from "@/lib/page-type-routes";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildPageMetadata(`/housing/${slug}`);
}

export function generateStaticParams() {
  return HOUSING_SLUGS.map((slug) => ({ slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!isSlug(slug, HOUSING_SLUGS)) notFound();
  const routePath = `/housing/${slug}`;
  if (templateForHousingSlug(slug) === "serviceForm") {
    return <ServiceFormPageTemplate path={routePath} />;
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
