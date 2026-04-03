import { notFound } from "next/navigation";
import {
  CalculatorPageTemplate,
  GuidePageTemplate,
} from "@/features/routes/page-type-templates";
import { DOCUMENT_SLUGS, isSlug } from "@/lib/routes";
import { templateForDocumentsSlug } from "@/lib/page-type-routes";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return DOCUMENT_SLUGS.map((slug) => ({ slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!isSlug(slug, DOCUMENT_SLUGS)) notFound();
  const path = `/documents/${slug}`;
  if (templateForDocumentsSlug(slug) === "calculator") {
    return <CalculatorPageTemplate path={path} />;
  }
  return <GuidePageTemplate path={path} />;
}
