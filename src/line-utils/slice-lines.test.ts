import { sliceLines } from "./slice-lines";
import { describe, it, expect } from "vitest";

describe("sliceLines", () => {
  it("matches case #1", () => {
    const slice = sliceLines({
      lines: [
        "I've always been the one to say the first goodbye",
        "Had to love and lose a hundred million times",
        "Had to get it wrong to know just what I like",
        "Now I'm fallin",
      ],
      startLineIndex: 1,
      startColumnIndex: 4,
      endLineIndex: 2,
      endColumnIndex: 6,
    });

    expect(slice).toEqual([
      "to love and lose a hundred million times",
      "Had to",
    ]);
  });

  it("matches case #2", () => {
    const slice = sliceLines({
      lines: ["Sun is shinin' in the sky", "There ain't a cloud in sight"],
      startLineIndex: 1,
      startColumnIndex: 12,
      endLineIndex: 1,
      endColumnIndex: 19,
    });

    expect(slice).toEqual(["a cloud"]);
  });
});
