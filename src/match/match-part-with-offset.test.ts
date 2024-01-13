import { expect, test } from "vitest";
import { matchPartWithOffset } from "./match-part-with-offset";

test("column offset to first line", () => {
  const adjustedMatch = matchPartWithOffset({
    matchPart: {
      type: "text",
      lineIndex: 0,
      startColumnIndex: 8,
      endColumnIndex: 19,
      text: "hello world",
    },
    offsetLineIndex: 1,
    offsetColumnIndex: 10,
  });

  expect(adjustedMatch).toEqual({
    type: "text",
    lineIndex: 1,
    startColumnIndex: 18,
    endColumnIndex: 29,
    text: "hello world",
  });
});

test("line offset when not the first line", () => {
  const adjustedMatch = matchPartWithOffset({
    matchPart: {
      type: "text",
      lineIndex: 2,
      startColumnIndex: 8,
      endColumnIndex: 19,
      text: "hello world",
    },
    offsetLineIndex: 1,
    offsetColumnIndex: 10,
  });

  expect(adjustedMatch).toEqual({
    type: "text",
    lineIndex: 3,
    startColumnIndex: 8,
    endColumnIndex: 19,
    text: "hello world",
  });
});
