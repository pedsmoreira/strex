import { matchAllPatternInLines } from "./match/match-all-pattern-in-lines";
import { patternPartsFromString } from "./pattern/pattern-parts-from-string";
import { StrexMatch, StrexMatchEndOn, StrexPattern } from "./types/index";

export function strex<TVariable extends string>({
  text,
  pattern,
  options,
}: {
  text: string;
  pattern: string;
  options?: {
    endOn?: StrexMatchEndOn;
    mustMatchAtLineStart?: boolean;
    mustMatchAtLineEnd?: boolean;
  };
}): StrexMatch<TVariable>[] {
  const { endOn, mustMatchAtLineStart, mustMatchAtLineEnd } = options || {};
  const parts = patternPartsFromString(pattern);

  const patternObject: StrexPattern = {
    patternParts: parts,
    mustMatchAtLineStart: Boolean(mustMatchAtLineStart),
    mustMatchAtLineEnd: Boolean(mustMatchAtLineEnd),
    endOn: endOn || { type: "pattern" },
  };

  const lines = text.split("\n");
  const matches = matchAllPatternInLines({
    lines,
    patternObject: patternObject,
  });

  return matches;
}

export { StrexMatch, StrexPattern, StrexMatchEndOn };
