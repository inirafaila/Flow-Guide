import { getTranslations } from "next-intl/server";
import { RoutePageBanner } from "@/features/routes/RoutePageBanner";

async function Block({ messageKey }: { messageKey: string }) {
  const t = await getTranslations("pageTemplate");
  return (
    <section className="page-template__block">
      <h2 className="page-template__block-title muted">{t(messageKey)}</h2>
      <div className="page-template__block-stub muted" aria-hidden="true">
        —
      </div>
    </section>
  );
}

/** Hub template shell per IA / UI handoff — structural placeholders only. */
export async function HubPageTemplate({ path }: { path: string }) {
  return (
    <article className="page-template page-template--hub">
      <RoutePageBanner path={path} />
      <div className="page-template__grid">
        <Block messageKey="hub.intro" />
        <Block messageKey="hub.topTasks" />
        <Block messageKey="hub.relatedGuides" />
        <Block messageKey="hub.quickTools" />
      </div>
    </article>
  );
}

/** Guide template shell — structural placeholders only. */
export async function GuidePageTemplate({ path }: { path: string }) {
  return (
    <article className="page-template page-template--guide">
      <RoutePageBanner path={path} />
      <div className="page-template__grid">
        <Block messageKey="guide.quickSummary" />
        <Block messageKey="guide.steps" />
        <Block messageKey="guide.requirements" />
        <Block messageKey="guide.costsTime" />
        <Block messageKey="guide.warnings" />
        <Block messageKey="guide.related" />
        <Block messageKey="guide.trustPlaceholder" />
      </div>
    </article>
  );
}

/** Calculator template shell — structural placeholders only (no logic). */
export async function CalculatorPageTemplate({ path }: { path: string }) {
  return (
    <article className="page-template page-template--calculator">
      <RoutePageBanner path={path} />
      <div className="page-template__grid">
        <Block messageKey="calculator.intro" />
        <Block messageKey="calculator.inputs" />
        <Block messageKey="calculator.results" />
        <Block messageKey="calculator.warnings" />
        <Block messageKey="calculator.trustPlaceholder" />
      </div>
    </article>
  );
}

/** Utility template shell (search / faq / updates) — grouped surface placeholder only. */
export async function UtilityPageTemplate({ path }: { path: string }) {
  const t = await getTranslations("pageTemplate");
  return (
    <article className="page-template page-template--utility">
      <RoutePageBanner path={path} />
      <section className="page-template__block">
        <h2 className="page-template__block-title muted">
          {t("utility.groupedSurface")}
        </h2>
        <div className="page-template__block-stub muted" aria-hidden="true">
          —
        </div>
      </section>
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
