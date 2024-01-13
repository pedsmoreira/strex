import { expect, test } from "vitest";
import { escapeRegexString } from "./escape-regex-string";

test("escapes ^ and $", () => {
  expect(escapeRegexString("^ and $")).toEqual("\\^ and \\$");
});
