import path from "node:path";
import { notFound } from "next/navigation";
import { RelatedPlacesBlock } from "@/features/places/RelatedPlacesBlock";
import { GuidePageTemplate } from "@/features/routes/page-type-templates";
import { loadPageContent } from "@/lib/content/load-page-content";
import { loadTrustDataForPage } from "@/lib/content/load-trust-for-page";
import { TRANSPORT_SLUGS, isSlug } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildPageMetadata(`/transport/${slug}`);
}

export function generateStaticParams() {
  return TRANSPORT_SLUGS.map((slug) => ({ slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!isSlug(slug, TRANSPORT_SLUGS)) notFound();
  const contentRoot = path.join(process.cwd(), "src", "content");
  const trust = loadTrustDataForPage(contentRoot, slug);
  const pageContent = loadPageContent(contentRoot, slug);
  return (
    <>
      <GuidePageTemplate
        path={`/transport/${slug}`}
        bodyHtml={pageContent?.bodyHtml}
        sources={trust.sources}
        lastVerifiedAt={trust.lastVerifiedAt}
        whatMayVary={trust.whatMayVary}
      />
      {slug === "public-transport-payments" ? (
        <RelatedPlacesBlock guideHref="/transport/public-transport-payments" />
      ) : null}
    </>
  );
}
