import { strex } from "../dist/strex";
import { it, expect } from "vitest";

it("works", () => {
  expect(strex({})).toBe("");
});

// it('matches case #1', () => {
//   const { result } = strex({
//     contents: importsExampleContent,
//     pattern: importsExamplePatternString,
//   });

//   expect(result).toEqual({
//     contents: importsExampleContent,
//     matches: importsExampleMatches,
//   });
// });
