import { expect, test } from "vitest";
import { splitByLine } from "./split-by-line";

test("splits lines", () => {
  expect(splitByLine("one\ntwo")).toEqual(["one", "two"]);
});
