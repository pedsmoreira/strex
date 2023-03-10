import { splitByLine } from "./line-utils";
import { describe, it, expect } from "vitest";
import {
  importsExampleContent,
  importsExampleMatches,
  importsExamplePattern,
} from "../../tests/fixtures/imports-example";
import { matchPatternPartsInLines } from "./match-pattern-parts-in-lines";

describe("matchPatternPartsInLines", () => {
  it("returns match parts", () => {
    const lines = splitByLine(importsExampleContent).slice(1);

    const matchParts = matchPatternPartsInLines({
      lines,
      pattern: importsExamplePattern,
    });

    expect(matchParts).toEqual(importsExampleMatches[0].matchParts);
  });
});
