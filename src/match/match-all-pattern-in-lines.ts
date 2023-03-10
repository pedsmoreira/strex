import { StrexMatch, StrexPattern } from "../types";
import { matchParts } from "./match-parts";
import { matchPatternPartsInLines } from "./match-pattern-parts-in-lines";

type Args = {
  lines: string[];
  patternObject: StrexPattern;
};

export function matchAllPatternInLines<T extends string>({
  lines: originalLines,
  patternObject: pattern,
}: Args): StrexMatch<T>[] {
  const matches: StrexMatch<T>[] = [];

  let loops = 0;

  let startLineIndex = 0;
  let startColumnIndex = 0;

  while (true) {
    if (startLineIndex > originalLines.length - 1) break;

    loops++;
    if (loops > originalLines.length + pattern.patternParts.length) {
      throw new Error("infinite loop!");
    }

    const [firstLine, ...otherLines] = originalLines.slice(startLineIndex);
    const slicedFirstLine = firstLine.substring(startColumnIndex);
    const lines = [slicedFirstLine, ...otherLines];

    const parts = matchPatternPartsInLines({ lines, pattern });

    if (!parts?.length) {
      startLineIndex += 1;
      continue;
    }

    const match = matchParts({
      lines,
      matchParts: parts,
      offsetLineIndex: startLineIndex,
      offsetColumnIndex: startColumnIndex,
    });

    matches.push(match);

    // Move the iterator to the end of the match
    const isEndOfLine =
      match.endColumnIndex === originalLines[match.endLineIndex].length;

    if (isEndOfLine) {
      startLineIndex = match.endLineIndex + 1;
      startColumnIndex = 0;
    } else {
      startLineIndex = match.endLineIndex;
      startColumnIndex = match.endColumnIndex;
    }
  }

  return matches;
}
