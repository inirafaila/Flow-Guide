import path from "node:path";
import { notFound } from "next/navigation";
import { RelatedPlacesBlock } from "@/features/places/RelatedPlacesBlock";
import { GuidePageTemplate } from "@/features/routes/page-type-templates";
import { loadPageContent } from "@/lib/content/load-page-content";
import { loadTrustDataForPage } from "@/lib/content/load-trust-for-page";
import { PAYMENTS_SLUGS, isSlug } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildPageMetadata(`/payments/${slug}`);
}

export function generateStaticParams() {
  return PAYMENTS_SLUGS.map((slug) => ({ slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!isSlug(slug, PAYMENTS_SLUGS)) notFound();
  const contentRoot = path.join(process.cwd(), "src", "content");
  const trust = loadTrustDataForPage(contentRoot, slug);
  const pageContent = loadPageContent(contentRoot, slug);
  const guideHref = `/payments/${slug}`;
  return (
    <>
      <GuidePageTemplate
        path={guideHref}
        bodyHtml={pageContent?.bodyHtml}
        sources={trust.sources}
        lastVerifiedAt={trust.lastVerifiedAt}
        whatMayVary={trust.whatMayVary}
      />
      {slug === "terminals" ? (
        <RelatedPlacesBlock guideHref="/payments/terminals" />
      ) : null}
    </>
  );
}
