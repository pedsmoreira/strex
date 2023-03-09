import { matchAllPatternInLines } from "./_internal/match-all-pattern-in-lines";
import { patternPartsFromString } from "./_internal/pattern-parts-from-string";
import { StrexMatch, StrexMatchEndOn, StrexPattern } from "./types/index";

export function strex<TVariable extends string>({
  contents,
  pattern: patternString,
  endOn,
  mustMatchAtLineStart,
  mustMatchAtLineEnd,
}: {
  contents: string;
  pattern: string;
  endOn?: StrexMatchEndOn;
  mustMatchAtLineStart?: boolean;
  mustMatchAtLineEnd?: boolean;
}): StrexMatch<TVariable>[] {
  const parts = patternPartsFromString(patternString);

  const pattern: StrexPattern = {
    patternParts: parts,
    mustMatchAtLineStart: Boolean(mustMatchAtLineStart),
    mustMatchAtLineEnd: Boolean(mustMatchAtLineEnd),
    endOn: endOn || { type: "pattern" },
  };

  const lines = contents.split("\n");
  const matches = matchAllPatternInLines({ lines, pattern });

  return matches;
}

export { StrexMatch, StrexPattern, StrexMatchEndOn };
