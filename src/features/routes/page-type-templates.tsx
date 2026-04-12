import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { LastVerifiedNote } from "@/components/ui/LastVerifiedNote";
import { SourceBlock } from "@/components/ui/SourceBlock";
import { WhatMayVaryNote } from "@/components/ui/WhatMayVaryNote";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RoutePageBanner } from "@/features/routes/RoutePageBanner";
import type { SourceRecordFrontmatter } from "@/lib/schemas/source-record";

async function Block({ messageKey }: { messageKey: string }) {
  const t = await getTranslations("pageTemplate");
  return (
    <Card>
      <SectionHeader className="muted">{t(messageKey)}</SectionHeader>
      <div className="page-template__block-stub muted" aria-hidden="true">
        —
      </div>
    </Card>
  );
}

export type HubPageTemplateProps = {
  path: string;
  bodyHtml?: string;
};

/** Hub template — optional rendered Markdown body or placeholder blocks. */
export async function HubPageTemplate({ path, bodyHtml }: HubPageTemplateProps) {
  const hasBody = Boolean(bodyHtml?.trim());
  return (
    <article className="page-template page-template--hub">
      <RoutePageBanner path={path} />
      {hasBody ? (
        <div
          className="hub-body"
          dangerouslySetInnerHTML={{ __html: bodyHtml ?? "" }}
        />
      ) : (
        <div className="page-template__grid">
          <Block messageKey="hub.intro" />
          <Block messageKey="hub.topTasks" />
          <Block messageKey="hub.relatedGuides" />
          <Block messageKey="hub.quickTools" />
        </div>
      )}
    </article>
  );
}

export type GuidePageTemplateProps = {
  path: string;
  bodyHtml?: string;
  sources?: SourceRecordFrontmatter[];
  lastVerifiedAt?: string;
  whatMayVary?: string;
};

/** Guide template — optional rendered Markdown body or placeholder blocks; optional trust blocks from content. */
export async function GuidePageTemplate({
  path,
  bodyHtml,
  sources,
  lastVerifiedAt,
  whatMayVary,
}: GuidePageTemplateProps) {
  const hasTrustData =
    (sources?.length ?? 0) > 0 ||
    Boolean(lastVerifiedAt) ||
    Boolean(whatMayVary);
  const hasBody = Boolean(bodyHtml?.trim());

  return (
    <article className="page-template page-template--guide">
      <RoutePageBanner path={path} />
      {hasBody ? (
        <>
          <div
            className="guide-body"
            dangerouslySetInnerHTML={{ __html: bodyHtml ?? "" }}
          />
          {hasTrustData ? (
            <div className="guide-trust-section">
              <SourceBlock sources={sources ?? []} />
              {lastVerifiedAt ? (
                <LastVerifiedNote verifiedAt={lastVerifiedAt} />
              ) : null}
              {whatMayVary ? <WhatMayVaryNote note={whatMayVary} /> : null}
            </div>
          ) : null}
        </>
      ) : (
        <div className="page-template__grid">
          <Block messageKey="guide.quickSummary" />
          <Block messageKey="guide.steps" />
          <Block messageKey="guide.requirements" />
          <Block messageKey="guide.costsTime" />
          <Block messageKey="guide.warnings" />
          <Block messageKey="guide.related" />
          {hasTrustData ? (
            <div className="guide-trust-section">
              <SourceBlock sources={sources ?? []} />
              {lastVerifiedAt ? (
                <LastVerifiedNote verifiedAt={lastVerifiedAt} />
              ) : null}
              {whatMayVary ? <WhatMayVaryNote note={whatMayVary} /> : null}
            </div>
          ) : (
            <Block messageKey="guide.trustPlaceholder" />
          )}
        </div>
      )}
    </article>
  );
}

export type CalculatorPageTemplateProps = {
  path: string;
  children?: ReactNode;
};

/** Calculator template — placeholders or optional interactive content (e.g. stay calculator). */
export async function CalculatorPageTemplate({
  path,
  children,
}: CalculatorPageTemplateProps) {
  return (
    <article className="page-template page-template--calculator">
      <RoutePageBanner path={path} />
      {children ? (
        children
      ) : (
        <div className="page-template__grid">
          <Block messageKey="calculator.intro" />
          <Block messageKey="calculator.inputs" />
          <Block messageKey="calculator.results" />
          <Block messageKey="calculator.warnings" />
          <Block messageKey="calculator.trustPlaceholder" />
        </div>
      )}
    </article>
  );
}

/** Utility template shell (search / faq / updates) — grouped surface placeholder only. */
export async function UtilityPageTemplate({ path }: { path: string }) {
  const t = await getTranslations("pageTemplate");
  return (
    <article className="page-template page-template--utility">
      <RoutePageBanner path={path} />
      <Card>
        <SectionHeader className="muted">{t("utility.groupedSurface")}</SectionHeader>
        <div className="page-template__block-stub muted" aria-hidden="true">
          —
        </div>
      </Card>
    </article>
  );
}

/** Service-form template shell — no form behavior. */
export async function ServiceFormPageTemplate({ path }: { path: string }) {
  return (
    <article className="page-template page-template--service-form">
      <RoutePageBanner path={path} />
      <div className="page-template__grid">
        <Block messageKey="serviceForm.intro" />
        <Block messageKey="serviceForm.formSchema" />
        <Block messageKey="serviceForm.privacyFollowUp" />
      </div>
    </article>
  );
}

/** Post-submit placeholder surface — no workflow. */
export async function ServiceFormFollowUpPageTemplate({
  path,
}: {
  path: string;
}) {
  return (
    <article className="page-template page-template--service-form-follow-up">
      <RoutePageBanner path={path} />
      <div className="page-template__grid">
        <Block messageKey="serviceFormFollowUp.intro" />
        <Block messageKey="serviceFormFollowUp.nextSteps" />
      </div>
    </article>
  );
}
