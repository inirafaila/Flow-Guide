/**
 * Guest persistence — Phase 2 implementation.
 * @see PHASE_0_DECISION_RECORD §5.5 — localStorage key, schemaVersion, 90d TTL.
 */
export const GUEST_STORAGE_KEY = "flowguide_guest_v1" as const;

export const GUEST_SCHEMA_VERSION = 1 as const;

export type GuestStateStub = {
  schemaVersion: typeof GUEST_SCHEMA_VERSION;
  /** Filled in Phase 2 per PRD / DATA_CONTENT_MODEL_SPEC */
};
