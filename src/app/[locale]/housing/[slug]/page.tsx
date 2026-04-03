import { notFound } from "next/navigation";
import {
  GuidePageTemplate,
  ServiceFormPageTemplate,
} from "@/features/routes/page-type-templates";
import { HOUSING_SLUGS, isSlug } from "@/lib/routes";
import { templateForHousingSlug } from "@/lib/page-type-routes";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return HOUSING_SLUGS.map((slug) => ({ slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!isSlug(slug, HOUSING_SLUGS)) notFound();
  const path = `/housing/${slug}`;
  if (templateForHousingSlug(slug) === "serviceForm") {
    return <ServiceFormPageTemplate path={path} />;
  }
  return <GuidePageTemplate path={path} />;
}
