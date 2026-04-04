import { afterEach, describe, expect, it, vi } from "vitest";
import {
  GUEST_SCHEMA_VERSION,
  GUEST_STORAGE_KEY,
  GUEST_TTL_MS,
} from "./constants";
import {
  clearGuestBlobInStorage,
  createInitialGuestBlob,
  isGuestBlobExpired,
  parseGuestBlobValue,
  readGuestBlob,
  readGuestBlobFromStorage,
  writeGuestBlobToStorage,
} from "./persistence";
import type { GuestBlobV1 } from "@/lib/schemas/guest-blob";

function createMemoryStorage(): {
  store: Map<string, string>;
  adapter: Pick<Storage, "getItem" | "setItem" | "removeItem">;
} {
  const store = new Map<string, string>();
  const adapter = {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => {
      store.set(k, v);
    },
    removeItem: (k: string) => {
      store.delete(k);
    },
  };
  return { store, adapter };
}

const sessionId = "550e8400-e29b-41d4-a716-446655440000";
const sessionIdB = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";

function makeValidBlob(overrides: Partial<GuestBlobV1> = {}): GuestBlobV1 {
  return {
    schemaVersion: GUEST_SCHEMA_VERSION,
    guestSessionId: sessionId,
    createdAt: "2026-04-01T12:00:00.000Z",
    lastActiveAt: "2026-04-04T12:00:00.000Z",
    ...overrides,
  };
}

describe("guest persistence", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("missing blob returns null and does not throw", () => {
    const { adapter } = createMemoryStorage();
    const now = new Date("2026-04-04T15:00:00.000Z");
    expect(readGuestBlobFromStorage(adapter, now)).toBeNull();
  });

  it("invalid JSON clears storage and returns null", () => {
    const { store, adapter } = createMemoryStorage();
    store.set(GUEST_STORAGE_KEY, "{not json");
    const now = new Date("2026-04-04T15:00:00.000Z");
    expect(readGuestBlobFromStorage(adapter, now)).toBeNull();
    expect(store.has(GUEST_STORAGE_KEY)).toBe(false);
  });

  it("invalid envelope clears storage and returns null", () => {
    const { store, adapter } = createMemoryStorage();
    store.set(GUEST_STORAGE_KEY, JSON.stringify({ foo: 1 }));
    const now = new Date("2026-04-04T15:00:00.000Z");
    expect(readGuestBlobFromStorage(adapter, now)).toBeNull();
    expect(store.has(GUEST_STORAGE_KEY)).toBe(false);
  });

  it("schema mismatch (wrong version) clears storage and returns null", () => {
    const { store, adapter } = createMemoryStorage();
    const bad = {
      ...makeValidBlob(),
      schemaVersion: 99,
    };
    store.set(GUEST_STORAGE_KEY, JSON.stringify(bad));
    const now = new Date("2026-04-04T15:00:00.000Z");
    expect(readGuestBlobFromStorage(adapter, now)).toBeNull();
    expect(store.has(GUEST_STORAGE_KEY)).toBe(false);
  });

  it("expired blob clears storage and returns null", () => {
    const { store, adapter } = createMemoryStorage();
    const now = new Date("2026-04-10T00:00:00.000Z");
    const lastActive = new Date(
      now.getTime() - GUEST_TTL_MS - 24 * 60 * 60 * 1000,
    ).toISOString();
    const blob = makeValidBlob({
      createdAt: "2026-01-01T00:00:00.000Z",
      lastActiveAt: lastActive,
    });
    store.set(GUEST_STORAGE_KEY, JSON.stringify(blob));
    expect(readGuestBlobFromStorage(adapter, now)).toBeNull();
    expect(store.has(GUEST_STORAGE_KEY)).toBe(false);
  });

  it("valid blob returns parsed value and updates lastActiveAt", () => {
    const { store, adapter } = createMemoryStorage();
    const blob = makeValidBlob({
      lastActiveAt: "2026-04-04T10:00:00.000Z",
    });
    store.set(GUEST_STORAGE_KEY, JSON.stringify(blob));
    const now = new Date("2026-04-04T12:00:00.000Z");
    const out = readGuestBlobFromStorage(adapter, now);
    expect(out).not.toBeNull();
    expect(out!.lastActiveAt).toBe("2026-04-04T12:00:00.000Z");
    expect(out!.guestSessionId).toBe(sessionId);
    const round = parseGuestBlobValue(
      JSON.parse(store.get(GUEST_STORAGE_KEY)!) as unknown,
    );
    expect(round?.lastActiveAt).toBe("2026-04-04T12:00:00.000Z");
  });

  it("createInitialGuestBlob sets session id and matching timestamps", () => {
    const now = new Date("2026-05-01T08:30:00.000Z");
    const b = createInitialGuestBlob(now, sessionIdB);
    expect(b.schemaVersion).toBe(1);
    expect(b.guestSessionId).toBe(sessionIdB);
    expect(b.createdAt).toBe(now.toISOString());
    expect(b.lastActiveAt).toBe(now.toISOString());
  });

  it("writeGuestBlobToStorage persists valid blob", () => {
    const { store, adapter } = createMemoryStorage();
    const blob = createInitialGuestBlob(
      new Date("2026-06-01T00:00:00.000Z"),
      sessionId,
    );
    writeGuestBlobToStorage(adapter, blob);
    const raw = store.get(GUEST_STORAGE_KEY);
    expect(raw).toBeTruthy();
    const parsed = parseGuestBlobValue(JSON.parse(raw!) as unknown);
    expect(parsed?.guestSessionId).toBe(sessionId);
  });

  it("clearGuestBlobInStorage removes key", () => {
    const { store, adapter } = createMemoryStorage();
    store.set(GUEST_STORAGE_KEY, "{}");
    clearGuestBlobInStorage(adapter);
    expect(store.has(GUEST_STORAGE_KEY)).toBe(false);
  });

  it("isGuestBlobExpired true when beyond 90d", () => {
    const now = new Date("2026-04-04T00:00:00.000Z");
    const last = new Date(now.getTime() - GUEST_TTL_MS - 1).toISOString();
    expect(isGuestBlobExpired(last, now)).toBe(true);
  });

  it("isGuestBlobExpired false within 90d", () => {
    const now = new Date("2026-04-04T00:00:00.000Z");
    const last = new Date(now.getTime() - GUEST_TTL_MS + 60_000).toISOString();
    expect(isGuestBlobExpired(last, now)).toBe(false);
  });

  it("parseGuestBlobValue returns null for invalid lastActiveAt datetime", () => {
    const bad = {
      ...makeValidBlob(),
      lastActiveAt: "not-a-date",
    };
    expect(parseGuestBlobValue(bad)).toBeNull();
  });

  it("readGuestBlob returns null without window (SSR-safe)", () => {
    expect(readGuestBlob(new Date())).toBeNull();
  });
});
