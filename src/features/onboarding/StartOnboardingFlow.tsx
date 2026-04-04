"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  createInitialGuestBlob,
  readGuestBlob,
  writeGuestBlob,
} from "@/lib/guest/storage";
import {
  mergeOnboardingAfterStep,
  patchForCompletedStep,
  resolveStartSlicePhase,
  START_SLICE_FIELD_ORDER,
  type StartSliceStep,
  type StepValue,
} from "@/lib/onboarding/start-slice";
import type { GuestBlobV1 } from "@/lib/schemas/guest-blob";
import type {
  UserLanguage,
  UserLocationStatus,
  UserNationality,
  UserPrimaryGoal,
} from "@/lib/schemas/user";

function probeLocalStorage(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const s = window.localStorage;
    const k = "__fg_ls_probe";
    s.setItem(k, "1");
    s.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

const LANGUAGES: UserLanguage[] = ["fa", "en", "ru"];
const NATIONALITIES: UserNationality[] = ["iran", "russia", "india", "other"];
const LOCATION_STATUSES: UserLocationStatus[] = [
  "inside_armenia",
  "outside_armenia",
];
const PRIMARY_GOALS: UserPrimaryGoal[] = [
  "start-life",
  "work",
  "housing",
  "documents",
];

type UiStep = StartSliceStep | "end";

export function StartOnboardingFlow() {
  const t = useTranslations("onboardingStart");
  const [ready, setReady] = useState(false);
  const [storageOk, setStorageOk] = useState(true);
  const [blob, setBlob] = useState<GuestBlobV1 | null>(null);
  const [step, setStep] = useState<UiStep>(1);
  const [pending, setPending] = useState<StepValue | null>(null);

  const hydrate = useCallback(() => {
    if (!probeLocalStorage()) {
      setStorageOk(false);
      setReady(true);
      return;
    }
    setStorageOk(true);
    const b = readGuestBlob();
    setBlob(b);
    const phase = resolveStartSlicePhase(b?.onboarding);
    if (phase.kind === "end") {
      setStep("end");
      setPending(null);
    } else {
      setStep(phase.step);
      const key = START_SLICE_FIELD_ORDER[phase.step - 1];
      const existing = b?.onboarding?.[key];
      setPending(existing !== undefined ? (existing as StepValue) : null);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (typeof step !== "number" || !blob) return;
    const key = START_SLICE_FIELD_ORDER[step - 1];
    const existing = blob.onboarding?.[key];
    setPending(existing !== undefined ? (existing as StepValue) : null);
  }, [step, blob]);

  const handleNext = () => {
    if (typeof step !== "number" || pending === null) return;
    const now = new Date();
    let base = blob;
    if (!base) {
      base = createInitialGuestBlob(now);
    }
    const patch = patchForCompletedStep(step, pending);
    const onboarding = mergeOnboardingAfterStep(
      base.onboarding,
      step,
      patch,
    );
    const updated: GuestBlobV1 = { ...base, onboarding };
    writeGuestBlob(updated);
    setBlob(updated);
    if (step === 4) {
      setStep("end");
      setPending(null);
    } else {
      const nextStep = (step + 1) as StartSliceStep;
      setStep(nextStep);
    }
  };

  const handleBack = () => {
    if (typeof step !== "number" || step <= 1) return;
    setStep((step - 1) as StartSliceStep);
  };

  if (!ready) {
    return (
      <Card as="article">
        <p className="muted">{t("loading")}</p>
      </Card>
    );
  }

  if (!storageOk) {
    return (
      <Card as="article">
        <p className="muted">{t("storageUnavailable")}</p>
      </Card>
    );
  }

  if (step === "end") {
    return (
      <Card as="article" className="start-onboarding">
        <h1 className="start-onboarding__title">{t("pageTitle")}</h1>
        <h2 className="start-onboarding__step-title">{t("endTitle")}</h2>
        <p className="muted">{t("endBody")}</p>
        <p style={{ marginTop: "var(--space-8)" }}>
          <Link
            href="/"
            className="fg-button fg-button--primary start-onboarding__cta-home"
          >
            {t("ctaHome")}
          </Link>
        </p>
      </Card>
    );
  }

  const progressFilled = step;
  const stepTitleKey = `step${step}Title` as
    | "step1Title"
    | "step2Title"
    | "step3Title"
    | "step4Title";

  return (
    <Card as="article" className="start-onboarding">
      <h1 className="start-onboarding__title">{t("pageTitle")}</h1>
      <div
        className="start-onboarding__progress"
        role="group"
        aria-label={t("progressA11y", { step, total: 4 })}
      >
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="start-onboarding__progress-segment"
            data-active={i <= progressFilled}
          />
        ))}
      </div>
      <h2 className="start-onboarding__step-title">{t(stepTitleKey)}</h2>

      {step === 1 && (
        <div className="start-onboarding__options">
          {LANGUAGES.map((code) => (
            <Button
              key={code}
              type="button"
              variant={pending === code ? "primary" : "secondary"}
              onClick={() => setPending(code)}
            >
              {t(`options.language.${code}`)}
            </Button>
          ))}
        </div>
      )}
      {step === 2 && (
        <div className="start-onboarding__options">
          {NATIONALITIES.map((code) => (
            <Button
              key={code}
              type="button"
              variant={pending === code ? "primary" : "secondary"}
              onClick={() => setPending(code)}
            >
              {t(`options.nationality.${code}`)}
            </Button>
          ))}
        </div>
      )}
      {step === 3 && (
        <div className="start-onboarding__options">
          {LOCATION_STATUSES.map((code) => (
            <Button
              key={code}
              type="button"
              variant={pending === code ? "primary" : "secondary"}
              onClick={() => setPending(code)}
            >
              {t(`options.location_status.${code}`)}
            </Button>
          ))}
        </div>
      )}
      {step === 4 && (
        <div className="start-onboarding__options">
          {PRIMARY_GOALS.map((code) => (
            <Button
              key={code}
              type="button"
              variant={pending === code ? "primary" : "secondary"}
              onClick={() => setPending(code)}
            >
              {t(`options.primary_goal.${code}`)}
            </Button>
          ))}
        </div>
      )}

      <div className="start-onboarding__nav">
        <Button
          type="button"
          variant="secondary"
          onClick={handleBack}
          disabled={step <= 1}
        >
          {t("back")}
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={handleNext}
          disabled={pending === null}
        >
          {t("next")}
        </Button>
      </div>
    </Card>
  );
}
