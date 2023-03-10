import { patternPartsToPatternVariableTextTuples } from "./pattern-parts-to-pattern-variable-text-tuples";
import { describe, it, expect } from "vitest";

describe("patternPartsToPatternVariableTextTuples", () => {
  it("returns tuples starting with variable", () => {
    expect(
      patternPartsToPatternVariableTextTuples([
        { type: "variable", name: "variable-one" },
        { type: "text", text: "text-one" },
        { type: "variable", name: "variable-two" },
        { type: "text", text: "text-two" },
      ])
    ).toEqual([
      [
        { type: "variable", name: "variable-one" },
        { type: "text", text: "text-one" },
      ],
      [
        { type: "variable", name: "variable-two" },
        { type: "text", text: "text-two" },
      ],
    ]);
  });

  it("returns tuples starting with text", () => {
    expect(
      patternPartsToPatternVariableTextTuples([
        { type: "text", text: "text-one" },
        { type: "variable", name: "variable-two" },
        { type: "text", text: "text-two" },
      ])
    ).toEqual([
      [undefined, { type: "text", text: "text-one" }],
      [
        { type: "variable", name: "variable-two" },
        { type: "text", text: "text-two" },
      ],
    ]);
  });

  it("returns tuples ending with variable", () => {
    expect(
      patternPartsToPatternVariableTextTuples([
        { type: "variable", name: "variable-one" },
        { type: "text", text: "text-one" },
        { type: "variable", name: "variable-two" },
        { type: "text", text: "text-two" },
        { type: "variable", name: "variable-three" },
      ])
    ).toEqual([
      [
        { type: "variable", name: "variable-one" },
        { type: "text", text: "text-one" },
      ],
      [
        { type: "variable", name: "variable-two" },
        { type: "text", text: "text-two" },
      ],
      [{ type: "variable", name: "variable-three" }, undefined],
    ]);
  });
});
