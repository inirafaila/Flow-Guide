/**
 * Guest localStorage contract — Phase 2.
 * @see PHASE_0_DECISION_RECORD §5.5, ENGINEERING_ARCHITECTURE §5
 */
export const GUEST_STORAGE_KEY = "flowguide_guest_v1" as const;

export const GUEST_SCHEMA_VERSION = 1 as const;

/** Sliding TTL: 90 days from lastActiveAt (milliseconds). */
export const GUEST_TTL_MS = 90 * 24 * 60 * 60 * 1000;
