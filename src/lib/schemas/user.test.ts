import { describe, expect, it } from "vitest";
import {
  userAccountStateSchema,
  userLanguageSchema,
  userLocationStatusSchema,
  userNationalitySchema,
  userPrimaryGoalSchema,
} from "@/lib/schemas/user";

describe("User enum schemas (DATA_CONTENT_MODEL_SPEC §5)", () => {
  it.each([
    ["userLanguageSchema", userLanguageSchema, "fa"],
    ["userLanguageSchema", userLanguageSchema, "en"],
    ["userNationalitySchema", userNationalitySchema, "iran"],
    ["userLocationStatusSchema", userLocationStatusSchema, "inside_armenia"],
    ["userPrimaryGoalSchema", userPrimaryGoalSchema, "start-life"],
    ["userAccountStateSchema", userAccountStateSchema, "guest"],
  ] as const)("accepts %s sample %s", (_name, schema, value) => {
    expect(schema.parse(value)).toBe(value);
  });

  it("rejects invalid language", () => {
    expect(() => userLanguageSchema.parse("de")).toThrow();
  });

  it("rejects invalid nationality", () => {
    expect(() => userNationalitySchema.parse("usa")).toThrow();
  });

  it("rejects invalid primary_goal (must match spec tokens)", () => {
    expect(() => userPrimaryGoalSchema.parse("start_life")).toThrow();
  });
});
