import { describe, expect, it } from "vitest";
import en from "../../messages/en.json";
import fa from "../../messages/fa.json";
import ru from "../../messages/ru.json";

/** Dot-paths to every string leaf (nested objects only; arrays not used in messages). */
function messageLeafPaths(obj: unknown, prefix = ""): string[] {
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    return prefix ? [prefix] : [];
  }
  const record = obj as Record<string, unknown>;
  const keys = Object.keys(record).sort();
  if (keys.length === 0) {
    return prefix ? [prefix] : [];
  }
  const out: string[] = [];
  for (const k of keys) {
    const v = record[k];
    const p = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === "object" && !Array.isArray(v)) {
      out.push(...messageLeafPaths(v, p));
    } else {
      out.push(p);
    }
  }
  return out;
}

describe("messages locale files", () => {
  it("en, fa, ru share the same message key tree", () => {
    const enKeys = messageLeafPaths(en).sort();
    const faKeys = messageLeafPaths(fa).sort();
    const ruKeys = messageLeafPaths(ru).sort();
    expect(faKeys).toEqual(enKeys);
    expect(ruKeys).toEqual(enKeys);
  });
});
