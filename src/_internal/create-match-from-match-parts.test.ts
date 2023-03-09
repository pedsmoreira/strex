import { splitByLine } from "./line-utils";
import {
  importsExampleContent,
  importsExampleMatches,
} from "../../tests/fixtures/imports-example";
import { createMatchFromMatchParts } from "./create-match-from-match-parts";
import { describe, it, expect } from "vitest";

describe("createMatchFromMatchParts", () => {
  it("returns match", () => {
    const lines = splitByLine(importsExampleContent).slice(1);

    expect(
      createMatchFromMatchParts({
        lines,
        matchParts: importsExampleMatches[0].matchParts,
        offsetLineIndex: 1,
        offsetColumnIndex: 0,
      })
    ).toEqual(importsExampleMatches[0]);
  });
});
