import { matchPatternVariableTextTupleParts } from "./match-pattern-variable-text-tuple-parts";
import { describe, it, expect } from "vitest";

describe("matchPatternVariableTextTupleParts", () => {
  it("returns match parts given a tuple with text only", () => {
    expect(
      matchPatternVariableTextTupleParts({
        lines: [`import oneReducer from '../redux/main/one';`],
        tuple: [undefined, { type: "text", text: "import " }],
        mustMatchAtLineStart: true,
        mustMatchAtLineEnd: false,
      })
    ).toEqual([
      {
        type: "text",
        text: "import ",
        lineIndex: 0,
        startColumnIndex: 0,
        endColumnIndex: 7,
      },
    ]);
  });

  it("returns match parts given a tuple with variable + text", () => {
    expect(
      matchPatternVariableTextTupleParts({
        lines: [`oneReducer from '../redux/main/one';`],
        tuple: [
          { type: "variable", name: "imports" },
          { type: "text", text: " from '" },
        ],
        mustMatchAtLineStart: true,
        mustMatchAtLineEnd: false,
      })
    ).toEqual([
      {
        type: "variable",
        name: "imports",
        value: "oneReducer",
        startLineIndex: 0,
        startColumnIndex: 0,
        endLineIndex: 0,
        endColumnIndex: 10,
      },
      {
        type: "text",
        text: " from '",
        lineIndex: 0,
        startColumnIndex: 10,
        endColumnIndex: 17,
      },
    ]);
  });
});
