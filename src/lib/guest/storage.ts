/**
 * Guest persistence — Phase 2 module surface.
 * @see PHASE_0_DECISION_RECORD §5.5 — localStorage key, schemaVersion, 90d TTL.
 */
export {
  GUEST_SCHEMA_VERSION,
  GUEST_STORAGE_KEY,
  GUEST_TTL_MS,
} from "./constants";

export {
  clearGuestBlob,
  clearGuestBlobInStorage,
  createInitialGuestBlob,
  isGuestBlobExpired,
  parseGuestBlobValue,
  readGuestBlob,
  readGuestBlobFromStorage,
  touchGuestBlob,
  writeGuestBlob,
  writeGuestBlobToStorage,
  type GuestStorageAdapter,
} from "./persistence";
