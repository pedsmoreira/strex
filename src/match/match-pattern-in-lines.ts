import { StrexPartMatch } from "../types/strex-part-match";
import { StrexPattern } from "../types/strex-pattern";
import { matchTupleInLines } from "./match-tuple-in-lines";
import { getTuplesForParts } from "../pattern/get-tuples-for-parts";
import { sliceLines } from "../line-utils/slice-lines";
import { matchPartWithOffset } from "../match/match-part-with-offset";

type Args<TVar extends string> = {
  lines: string[];
  pattern: StrexPattern<TVar>;
};

export function matchPatternInLines<TVar extends string>({
  lines,
  pattern,
}: Args<TVar>): StrexPartMatch<TVar>[] {
  const { patternParts, mustMatchAtLineStart, mustMatchAtLineEnd } = pattern;

  const tuples = getTuplesForParts(patternParts);
  const matchParts: StrexPartMatch<TVar>[] = [];

  for (let i = 0; i < tuples.length; i++) {
    if (lines.length === 0) return [];

    const tuple = tuples[i];

    const lastMatchPart =
      matchParts.length > 0 ? matchParts[matchParts.length - 1] : undefined;

    const offsetLineIndex = lastMatchPart
      ? lastMatchPart.type === "text"
        ? lastMatchPart.lineIndex
        : lastMatchPart.endLineIndex
      : 0;

    const offsetColumnIndex = lastMatchPart ? lastMatchPart.endColumnIndex : 0;

    const slicedLines = sliceLines({
      lines,
      startLineIndex: offsetLineIndex,
      startColumnIndex: offsetColumnIndex,
    });

    const isFirstTuple = i === 0;
    const isLastTuple = i === tuples.length - 1;

    const tupleMatches = matchTupleInLines<TVar>({
      lines: slicedLines,
      tuple,
      mustMatchAtLineStart: mustMatchAtLineStart && isFirstTuple,
      mustMatchAtLineEnd: mustMatchAtLineEnd && isLastTuple,
    }).map((matchPart) =>
      matchPartWithOffset({ matchPart, offsetLineIndex, offsetColumnIndex }),
    );

    if (tupleMatches.length === 0) return [];

    matchParts.push(...tupleMatches);
  }

  return matchParts;
}
