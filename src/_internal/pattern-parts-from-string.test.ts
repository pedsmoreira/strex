import { patternPartsFromString } from "./pattern-parts-from-string";
import { describe, it, expect } from "vitest";

describe("patternFromString", function () {
  it("matches case #1", () => {
    expect(
      patternPartsFromString("import @{{ name }} from '@{{ location }}';")
    ).toEqual([
      { type: "text", text: "import " },
      { type: "variable", name: "name" },
      { type: "text", text: " from '" },
      { type: "variable", name: "location" },
      { type: "text", text: "';" },
    ]);
  });
});
