import {
  GUEST_SCHEMA_VERSION,
  GUEST_STORAGE_KEY,
  GUEST_TTL_MS,
} from "@/lib/guest/constants";
import {
  type GuestBlobV1,
  guestBlobV1Schema,
} from "@/lib/schemas/guest-blob";

/** Minimal storage surface for tests and browser adapter. */
export type GuestStorageAdapter = Pick<
  Storage,
  "getItem" | "setItem" | "removeItem"
>;

function parseStoredJson(raw: string): unknown | null {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

export function isGuestBlobExpired(
  lastActiveAtIso: string,
  now: Date,
): boolean {
  const last = Date.parse(lastActiveAtIso);
  if (Number.isNaN(last)) return true;
  return now.getTime() - last > GUEST_TTL_MS;
}

export function touchGuestBlob(blob: GuestBlobV1, nowIso: string): GuestBlobV1 {
  return { ...blob, lastActiveAt: nowIso };
}

/** Validate unknown JSON value; returns null if invalid. */
export function parseGuestBlobValue(data: unknown): GuestBlobV1 | null {
  const r = guestBlobV1Schema.safeParse(data);
  return r.success ? r.data : null;
}

/**
 * Read guest blob from storage: validate, enforce TTL, touch lastActiveAt on success.
 * On any invalid / expired state: clears storage and returns null.
 * Missing key returns null without writing.
 */
export function readGuestBlobFromStorage(
  storage: GuestStorageAdapter,
  now: Date,
): GuestBlobV1 | null {
  const raw = storage.getItem(GUEST_STORAGE_KEY);
  if (raw === null || raw === "") {
    return null;
  }

  const parsed = parseStoredJson(raw);
  if (parsed === null) {
    storage.removeItem(GUEST_STORAGE_KEY);
    return null;
  }

  const blob = parseGuestBlobValue(parsed);
  if (blob === null) {
    storage.removeItem(GUEST_STORAGE_KEY);
    return null;
  }

  if (isGuestBlobExpired(blob.lastActiveAt, now)) {
    storage.removeItem(GUEST_STORAGE_KEY);
    return null;
  }

  const nowIso = now.toISOString();
  const touched = touchGuestBlob(blob, nowIso);
  storage.setItem(GUEST_STORAGE_KEY, JSON.stringify(touched));
  return touched;
}

/** Replace entire blob. Throws if blob fails schema (programmer error). */
export function writeGuestBlobToStorage(
  storage: GuestStorageAdapter,
  blob: GuestBlobV1,
): void {
  const parsed = guestBlobV1Schema.parse(blob);
  storage.setItem(GUEST_STORAGE_KEY, JSON.stringify(parsed));
}

export function clearGuestBlobInStorage(storage: GuestStorageAdapter): void {
  storage.removeItem(GUEST_STORAGE_KEY);
}

export function createInitialGuestBlob(
  now: Date,
  sessionId: string = crypto.randomUUID(),
): GuestBlobV1 {
  const iso = now.toISOString();
  return {
    schemaVersion: GUEST_SCHEMA_VERSION,
    guestSessionId: sessionId,
    createdAt: iso,
    lastActiveAt: iso,
  };
}

function getBrowserLocalStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

/** Browser read; returns null when storage unavailable (e.g. SSR) or missing/invalid/expired. */
export function readGuestBlob(now: Date = new Date()): GuestBlobV1 | null {
  const s = getBrowserLocalStorage();
  if (s === null) return null;
  return readGuestBlobFromStorage(s, now);
}

export function writeGuestBlob(blob: GuestBlobV1): void {
  const s = getBrowserLocalStorage();
  if (s === null) return;
  writeGuestBlobToStorage(s, blob);
}

export function clearGuestBlob(): void {
  const s = getBrowserLocalStorage();
  if (s === null) return;
  clearGuestBlobInStorage(s);
}
