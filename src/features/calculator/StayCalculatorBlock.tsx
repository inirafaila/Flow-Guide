"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
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

const STATUS_LABEL: Record<StayCalculatorResult["status"], string> = {
  safe: "Safe",
  watch: "Watch",
  urgent: "Urgent",
};

/**
 * Interactive 90-in-180 stay calculator for /documents/stay-calculator.
 */
export function StayCalculatorBlock() {
  const [entries, setEntries] = useState<StayEntry[]>([
    { arrival: "", departure: "" },
  ]);
  const [result, setResult] = useState<StayCalculatorResult | null>(null);

  function handleCalculate() {
    const validEntries = filterValidEntries(entries);
    setResult(calculateStay({ entries: validEntries }));
  }

  return (
    <section className="stay-calc" aria-labelledby="stay-calc-heading">
      <div className="stay-calc__intro">
        <h2 id="stay-calc-heading" className="stay-calc__title">
          90-in-180 Stay Calculator
        </h2>
        <p className="stay-calc__description muted">
          Track how many days you&apos;ve stayed in Armenia within the rolling
          180-day window. Add your arrival and departure dates below.
        </p>
      </div>

      <Card className="stay-calc__card">
        <SectionHeader>Stay periods</SectionHeader>
        <div className="stay-calc__entries">
          {entries.map((entry, index) => (
            <div className="stay-calc__entry-row" key={index}>
              <label className="stay-calc__entry-label">
                <span className="muted">Arrival</span>
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
                <span className="muted">Departure</span>
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
                Remove
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
          + Add stay period
        </Button>
        <div className="stay-calc__calculate">
          <Button type="button" variant="primary" onClick={handleCalculate}>
            Calculate
          </Button>
        </div>
      </Card>

      {result !== null ? (
        <Card className="stay-calc__card stay-calc__result">
          <div
            className={`stay-calc__status stay-calc__status--${result.status}`}
          >
            {STATUS_LABEL[result.status]}
          </div>
          <p className="stay-calc__summary">
            {result.daysUsed} days used out of {result.maxDays} —{" "}
            {result.daysRemaining} days remaining
          </p>
          <p className="stay-calc__window muted">
            Window: {result.windowStart} to {result.asOf}
          </p>
          {result.status === "urgent" ? (
            <p className="stay-calc__warning" role="status">
              Your stay limit is nearly reached or exceeded. Consider consulting
              immigration guidance.
            </p>
          ) : null}
          {result.status === "watch" ? (
            <p className="stay-calc__warning" role="status">
              You&apos;re approaching your stay limit. Plan accordingly.
            </p>
          ) : null}
        </Card>
      ) : null}
    </section>
  );
}
