import { extractFromLines } from "./extract-from-lines";
import { StrexMatch, StrexMatchPart } from "../types";
import { extractVariablesFromMatchParts } from "./extract-variables-from-match-parts";
import { joinLines } from "./line-utils";

type Args<T extends string> = {
  lines: string[];
  matchParts: StrexMatchPart<T>[];
  offsetLineIndex: number;
  offsetColumnIndex: number;
};

export function createMatchFromMatchParts<T extends string>({
  lines,
  matchParts,
  offsetLineIndex,
  offsetColumnIndex,
}: Args<T>): StrexMatch<T> {
  const firstMatchPart = matchParts[0];
  const lastMatchPart = matchParts[matchParts.length - 1];

  const startLineIndex =
    firstMatchPart.type === "text"
      ? firstMatchPart.lineIndex
      : firstMatchPart.startLineIndex;

  const endLineIndex =
    lastMatchPart.type === "text"
      ? lastMatchPart.lineIndex
      : lastMatchPart.endLineIndex;

  const matchedLines = extractFromLines({
    lines,
    startLineIndex: 0,
    startColumnIndex: 0,
    endLineIndex: endLineIndex,
    endColumnIndex: lastMatchPart.endColumnIndex,
  });

  const variables = extractVariablesFromMatchParts({ matchParts });

  return {
    text: joinLines(matchedLines),
    startLineIndex: offsetLineIndex + startLineIndex,
    startColumnIndex: offsetColumnIndex + firstMatchPart.startColumnIndex,
    endLineIndex: offsetLineIndex + endLineIndex,
    endColumnIndex:
      startLineIndex === endLineIndex
        ? offsetColumnIndex + lastMatchPart.endColumnIndex
        : lastMatchPart.endColumnIndex,
    matchParts,
    variables,
  };
}
