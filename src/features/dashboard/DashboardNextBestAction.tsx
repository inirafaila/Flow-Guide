"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { trackEvent } from "@/lib/analytics/track-event";
import { readGuestBlob } from "@/lib/guest/storage";
import { deriveGuestOnboardingOutcomePreviewV1 } from "@/lib/onboarding/onboarding-outcome-preview";
import { step6SecondaryVisibleLabel } from "@/features/onboarding/onboarding-step6-labels";
import type { GuestOnboardingOutcomePreviewV1 } from "@/lib/onboarding/onboarding-outcome-preview";

type DashboardViewState =
  | { kind: "loading" }
  | { kind: "no_blob" }
  | { kind: "incomplete" }
  | { kind: "valid"; preview: GuestOnboardingOutcomePreviewV1 };

const MAX_SECONDARY_LINKS = 2;

function trackNbaClick(role: "primary" | "secondary", target: string | undefined) {
  const slug = target?.trim();
  if (!slug) return;
  trackEvent("next_action_clicked", { role, target: slug });
}

export function DashboardNextBestAction() {
  const t = useTranslations("dashboard");
  const tShell = useTranslations("shell");
  const tStep6 = useTranslations("onboardingStart");
  const [state, setState] = useState<DashboardViewState>({ kind: "loading" });

  useEffect(() => {
    const blob = readGuestBlob();
    if (blob === null) {
      setState({ kind: "no_blob" });
      return;
    }
    const preview = deriveGuestOnboardingOutcomePreviewV1(blob.onboarding);
    if (preview === null) {
      setState({ kind: "incomplete" });
      return;
    }
    setState({ kind: "valid", preview });
  }, []);

  return (
    <>
      <h1 className="dashboard-page__title">{t("pageTitle")}</h1>
      <Card as="article" className="dashboard-nba">
        {state.kind === "loading" ? (
          <p className="muted">{t("loading")}</p>
        ) : null}

        {state.kind === "no_blob" ? (
          <>
            <h2 className="start-onboarding__step-title">
              {t("empty.noBlobTitle")}
            </h2>
            <p className="muted start-onboarding__step6-intro">
              {t("empty.noBlobBody")}
            </p>
            <div className="start-onboarding__step6-cta-stack">
              <Link
                href="/start"
                className="fg-button fg-button--primary start-onboarding__cta-home"
              >
                {tShell("start")}
              </Link>
              <Link
                href="/"
                className="fg-button fg-button--secondary start-onboarding__cta-home"
              >
                {tShell("home")}
              </Link>
            </div>
          </>
        ) : null}

        {state.kind === "incomplete" ? (
          <>
            <h2 className="start-onboarding__step-title">
              {t("empty.incompleteTitle")}
            </h2>
            <p className="muted start-onboarding__step6-intro">
              {t("empty.incompleteBody")}
            </p>
            <div className="start-onboarding__step6-cta-stack">
              <Link
                href="/start"
                className="fg-button fg-button--primary start-onboarding__cta-home"
              >
                {tShell("start")}
              </Link>
              <Link
                href="/"
                className="fg-button fg-button--secondary start-onboarding__cta-home"
              >
                {tShell("home")}
              </Link>
            </div>
          </>
        ) : null}

        {state.kind === "valid" ? (
          <>
            <h2 className="start-onboarding__step-title">
              {t("nba.sectionTitle")}
            </h2>
            <p className="start-onboarding__step6-emphasis">
              {tStep6(`step6.emphasis.${state.preview.emphasis}`)}
            </p>
            <div className="start-onboarding__step6-primary-wrap">
              <Link
                href={state.preview.primary.page_slug}
                className="fg-button fg-button--primary start-onboarding__cta-home"
                onClick={() =>
                  trackNbaClick("primary", state.preview.primary.checklist_item_slug)
                }
              >
                {tStep6(`step6.reason.${state.preview.primary.reason_key}`)}
              </Link>
            </div>
            {state.preview.secondaries.length > 0 ? (
              <ul
                className="start-onboarding__step6-secondaries"
                aria-label={tStep6("step6.secondariesA11y")}
              >
                {state.preview.secondaries
                  .slice(0, MAX_SECONDARY_LINKS)
                  .map((s) => (
                    <li key={`${s.checklist_item_slug}-${s.page_slug}`}>
                      <Link
                        href={s.page_slug}
                        className="fg-button fg-button--secondary start-onboarding__step6-secondary-link"
                        onClick={() =>
                          trackNbaClick("secondary", s.checklist_item_slug)
                        }
                      >
                        {step6SecondaryVisibleLabel(
                          s.checklist_item_slug,
                          s.page_slug,
                          (key, values) => tStep6(key, values),
                        )}
                      </Link>
                    </li>
                  ))}
              </ul>
            ) : null}
          </>
        ) : null}
      </Card>
    </>
  );
}
