import Link from "next/link";
import { getTranslations } from "next-intl/server";

/**
 * Phase 4.6 — static re-entry framing above dashboard NBA (no guest blob read).
 */
export async function DashboardReentryNote() {
  const t = await getTranslations("dashboard");

  return (
    <p className="dashboard-page__intro muted">
      {t("intro")}{" "}
      <Link href="/start" className="dashboard-page__edit-link">
        {t("editAnswers")}
      </Link>
    </p>
  );
}
