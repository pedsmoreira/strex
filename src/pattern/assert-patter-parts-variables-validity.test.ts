import { test } from "vitest";
import { assertPatternPartsVariablesValidity } from "./assert-pattern-parts-variables-validity";

test.fails("with variable missing", () => {
  assertPatternPartsVariablesValidity({
    parts: [
      { type: "variable", name: "one" },
      { type: "variable", name: "two" },
    ],
    variables: ["one"],
  });
});

test.fails("with variable exceeding", () => {
  assertPatternPartsVariablesValidity({
    parts: [
      { type: "variable", name: "one" },
      { type: "variable", name: "two" },
    ],
    variables: ["one", "two", "three"],
  });
});
