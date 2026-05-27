"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { trackEvent } from "@/lib/analytics/track-event";
import {
  calculateStay,
  type StayCalculatorResult,
  type StayEntry,
} from "@/lib/stay-calculator/stay-calculator";

/** Entries with both arrival and departure filled (non-empty after trim). */
export function filterValidEntries(entries: StayEntry[]): StayEntry[] {
  return entries.filter(
    (e) => e.arrival.trim() !== "" && e.departure.trim() !== "",
  );
}

function updateEntryAt(
  entries: StayEntry[],
  index: number,
  patch: Partial<StayEntry>,
): StayEntry[] {
  return entries.map((row, i) =>
    i === index ? { ...row, ...patch } : row,
  );
}

function removeEntryAt(entries: StayEntry[], index: number): StayEntry[] {
  return entries.filter((_, i) => i !== index);
}

/**
 * Interactive 90-in-180 stay calculator for /documents/stay-calculator.
 */
export function StayCalculatorBlock() {
  const t = useTranslations("stayCalculator");
  const [entries, setEntries] = useState<StayEntry[]>([
    { arrival: "", departure: "" },
  ]);
  const [result, setResult] = useState<StayCalculatorResult | null>(null);

  function handleCalculate() {
    const validEntries = filterValidEntries(entries);
    trackEvent("stay_calculator_used", {
      has_valid_entries: validEntries.length > 0,
    });
    setResult(calculateStay({ entries: validEntries }));
  }

  return (
    <section className="stay-calc" aria-labelledby="stay-calc-heading">
      <div className="stay-calc__intro">
        <h2 id="stay-calc-heading" className="stay-calc__title">
          {t("title")}
        </h2>
        <p className="stay-calc__description muted">{t("description")}</p>
        <p className="stay-calc__variance muted">{t("varianceNote")}</p>
      </div>

      <Card className="stay-calc__card">
        <SectionHeader>{t("stayPeriods")}</SectionHeader>
        <div className="stay-calc__entries">
          {entries.map((entry, index) => (
            <div className="stay-calc__entry-row" key={index}>
              <label className="stay-calc__entry-label">
                <span className="muted">{t("arrival")}</span>
                <input
                  className="stay-calc__entry-input"
                  type="date"
                  value={entry.arrival}
                  onChange={(e) =>
                    setEntries((prev) =>
                      updateEntryAt(prev, index, {
                        arrival: e.target.value,
                      }),
                    )
                  }
                />
              </label>
              <label className="stay-calc__entry-label">
                <span className="muted">{t("departure")}</span>
                <input
                  className="stay-calc__entry-input"
                  type="date"
                  value={entry.departure}
                  onChange={(e) =>
                    setEntries((prev) =>
                      updateEntryAt(prev, index, {
                        departure: e.target.value,
                      }),
                    )
                  }
                />
              </label>
              <Button
                type="button"
                variant="secondary"
                className="stay-calc__entry-remove"
                onClick={() =>
                  setEntries((prev) => {
                    const next = removeEntryAt(prev, index);
                    return next.length > 0
                      ? next
                      : [{ arrival: "", departure: "" }];
                  })
                }
              >
                {t("remove")}
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="secondary"
          className="stay-calc__add-btn"
          onClick={() =>
            setEntries((prev) => [...prev, { arrival: "", departure: "" }])
          }
        >
          {t("addPeriod")}
        </Button>
        <div className="stay-calc__calculate">
          <Button type="button" variant="primary" onClick={handleCalculate}>
            {t("calculate")}
          </Button>
        </div>
      </Card>

      {result !== null ? (
        <Card className="stay-calc__card stay-calc__result">
          <div
            className={`stay-calc__status stay-calc__status--${result.status}`}
          >
            {t(`status.${result.status}`)}
          </div>
          <p className="stay-calc__summary">
            {t("daysSummary", {
              daysUsed: result.daysUsed,
              maxDays: result.maxDays,
              daysRemaining: result.daysRemaining,
            })}
          </p>
          <p className="stay-calc__window muted">
            {t("window", {
              windowStart: result.windowStart,
              asOf: result.asOf,
            })}
          </p>
          {result.status === "urgent" ? (
            <p className="stay-calc__warning" role="status">
              {t("warningUrgent")}
            </p>
          ) : null}
          {result.status === "watch" ? (
            <p className="stay-calc__warning" role="status">
              {t("warningWatch")}
            </p>
          ) : null}
        </Card>
      ) : null}
    </section>
  );
}
