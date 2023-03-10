import { sliceLines } from "../line-utils/slice-lines";
import { StrexMatch } from "../types/strex-match";
import { StrexPartMatch } from "../types/strex-part-match";
import { getVarsInPartMatches } from "./get-vars-in-part-matches";
import { joinLines } from "../line-utils/join-lines";

type Args<T extends string> = {
  lines: string[];
  partMatches: StrexPartMatch<T>[];
  offsetLineIndex: number;
  offsetColumnIndex: number;
};

export function matchParts<T extends string>({
  lines,
  partMatches,
  offsetLineIndex,
  offsetColumnIndex,
}: Args<T>): StrexMatch<T> {
  const firstMatchPart = partMatches[0];
  const lastMatchPart = partMatches[partMatches.length - 1];

  const startLineIndex =
    firstMatchPart.type === "text"
      ? firstMatchPart.lineIndex
      : firstMatchPart.startLineIndex;

  const endLineIndex =
    lastMatchPart.type === "text"
      ? lastMatchPart.lineIndex
      : lastMatchPart.endLineIndex;

  const matchedLines = sliceLines({
    lines,
    startLineIndex: 0,
    startColumnIndex: 0,
    endLineIndex: endLineIndex,
    endColumnIndex: lastMatchPart.endColumnIndex,
  });

  const variables = getVarsInPartMatches(partMatches);

  const endColumnIndex =
    startLineIndex === endLineIndex
      ? offsetColumnIndex + lastMatchPart.endColumnIndex
      : lastMatchPart.endColumnIndex;

  return {
    text: joinLines(matchedLines),
    startLineIndex: offsetLineIndex + startLineIndex,
    startColumnIndex: offsetColumnIndex + firstMatchPart.startColumnIndex,
    endLineIndex: offsetLineIndex + endLineIndex,
    endColumnIndex,
    matchParts: partMatches,
    variables,
  };
}
