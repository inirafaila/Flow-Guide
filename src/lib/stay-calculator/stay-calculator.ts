/** Rolling stay window: 90 unique calendar days within a 180-day window ending on `asOf` (PRD: 90-in-180). */

export type StayEntry = {
  /** ISO date string: arrival date */
  arrival: string;
  /** ISO date string: departure date (inclusive) */
  departure: string;
};

export type StayCalculatorInput = {
  entries: StayEntry[];
  /** ISO date string: the date to calculate status for (default: today UTC) */
  asOf?: string;
};

export type StayCalculatorResult = {
  /** Days used in the current 180-day rolling window */
  daysUsed: number;
  /** Days remaining before hitting 90 */
  daysRemaining: number;
  /** Total window size (always 180) */
  windowDays: number;
  /** Maximum allowed days in window (always 90) */
  maxDays: number;
  /** Status based on remaining days */
  status: "safe" | "watch" | "urgent";
  /** The earliest date of the current 180-day window */
  windowStart: string;
  /** The asOf date used for calculation */
  asOf: string;
};

const WINDOW_DAYS = 180;
const MAX_STAY_DAYS = 90;

function isoDateOnly(s: string): string {
  const t = s.trim();
  if (t.length < 10) {
    throw new Error(`Invalid ISO date: ${s}`);
  }
  return t.slice(0, 10);
}

function parseUtcDay(isoDay: string): Date {
  const d = isoDateOnly(isoDay);
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d);
  if (!m) {
    throw new Error(`Invalid ISO date: ${isoDay}`);
  }
  return new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
}

function formatUtcDay(d: Date): string {
  const y = d.getUTCFullYear();
  const mo = String(d.getUTCMonth() + 1).padStart(2, "0");
  const da = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${mo}-${da}`;
}

function addUtcDays(isoDay: string, delta: number): string {
  const d = parseUtcDay(isoDay);
  d.setUTCDate(d.getUTCDate() + delta);
  return formatUtcDay(d);
}

function compareIso(a: string, b: string): number {
  return isoDateOnly(a).localeCompare(isoDateOnly(b));
}

function maxIso(a: string, b: string): string {
  return compareIso(a, b) >= 0 ? isoDateOnly(a) : isoDateOnly(b);
}

function minIso(a: string, b: string): string {
  return compareIso(a, b) <= 0 ? isoDateOnly(a) : isoDateOnly(b);
}

function addDateRangeToSet(
  unique: Set<string>,
  startInclusive: string,
  endInclusive: string,
): void {
  let cur = startInclusive;
  for (;;) {
    unique.add(cur);
    if (cur === endInclusive) break;
    cur = addUtcDays(cur, 1);
    if (compareIso(cur, endInclusive) > 0) break;
  }
}

/** Count unique days across all entries that fall within [windowStart, asOf]. */
export function countDaysInWindow(
  entries: StayEntry[],
  windowStart: string,
  asOf: string,
): number {
  const ws = isoDateOnly(windowStart);
  const end = isoDateOnly(asOf);
  const unique = new Set<string>();

  for (const e of entries) {
    const arrival = isoDateOnly(e.arrival);
    const departure = isoDateOnly(e.departure);
    const rangeStart = maxIso(arrival, ws);
    const cappedDeparture = minIso(departure, end);
    const rangeEnd = minIso(cappedDeparture, end);
    if (compareIso(rangeStart, rangeEnd) > 0) continue;
    addDateRangeToSet(unique, rangeStart, rangeEnd);
  }

  return unique.size;
}

function defaultAsOfIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function statusFromRemaining(daysRemaining: number): "safe" | "watch" | "urgent" {
  if (daysRemaining > 20) return "safe";
  if (daysRemaining > 7) return "watch";
  return "urgent";
}

export function calculateStay(input: StayCalculatorInput): StayCalculatorResult {
  const asOf = input.asOf !== undefined ? isoDateOnly(input.asOf) : defaultAsOfIso();
  const windowStart = addUtcDays(asOf, -(WINDOW_DAYS - 1));

  const daysUsed = countDaysInWindow(input.entries, windowStart, asOf);
  const daysRemaining = Math.max(0, MAX_STAY_DAYS - daysUsed);

  return {
    daysUsed,
    daysRemaining,
    windowDays: WINDOW_DAYS,
    maxDays: MAX_STAY_DAYS,
    status: statusFromRemaining(daysRemaining),
    windowStart,
    asOf,
  };
}
