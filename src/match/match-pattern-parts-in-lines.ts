import { StrexPartMatch } from "../types/strex-part-match";
import { StrexPattern } from "../types/strex-pattern";
import { linesForEndOn } from "../line-utils/lines-for-end-on";
import { matchPatternVariableTextTupleParts } from "./match-pattern-variable-text-tuple-parts";
import { matchPartWithOffset } from "./match-part-with-offset";
import { getTuplesForParts } from "../pattern/get-tuples-for-parts";

type Args = {
  lines: string[];
  pattern: StrexPattern;
};

export function matchPatternPartsInLines<T extends string>({
  lines: originalLines,
  pattern,
}: Args): StrexPartMatch<T>[] | undefined {
  const { patternParts, mustMatchAtLineStart, mustMatchAtLineEnd, endOn } =
    pattern;

  const linesBeforeEnd = linesForEndOn({ lines: originalLines, endOn });

  const tuples = getTuplesForParts(patternParts);
  const matchParts: StrexPartMatch<T>[] = [];

  let startLineIndex = 0;
  let startColumnIndex = 0;

  for (let i = 0; i < tuples.length; i++) {
    const tuple = tuples[i];

    const [firstLine, ...otherLines] = linesBeforeEnd.slice(startLineIndex);
    const slicedFirstLine = firstLine.substring(startColumnIndex);
    const lines = [slicedFirstLine, ...otherLines];

    const isFirstTuple = i === 0;
    const isLastTuple = i === tuples.length - 1;

    const tupleMatchParts = matchPatternVariableTextTupleParts<T>({
      lines,
      tuple,
      mustMatchAtLineStart: mustMatchAtLineStart || !isFirstTuple,
      mustMatchAtLineEnd: mustMatchAtLineEnd && isLastTuple,
    })?.map((matchPart) =>
      matchPartWithOffset({
        matchPart,
        offsetStartLineIndex: startLineIndex,
        offsetColumnIndex: startColumnIndex,
      })
    );

    if (!tupleMatchParts) return undefined;

    const lastTupleMatch = tupleMatchParts[tupleMatchParts.length - 1];
    const endLineIndex =
      lastTupleMatch.type === "text"
        ? lastTupleMatch.lineIndex
        : lastTupleMatch.endLineIndex;

    // Move the iterator to the end of the match
    const isEndOfLine =
      lastTupleMatch.endColumnIndex === originalLines[endLineIndex].length - 1;

    if (isEndOfLine) {
      startLineIndex = endLineIndex + 1;
      startColumnIndex = 0;
    } else {
      startLineIndex = endLineIndex;
      startColumnIndex = lastTupleMatch.endColumnIndex;
    }

    matchParts.push(...tupleMatchParts);
  }

  return matchParts;
}
