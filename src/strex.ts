import { StrexMatchEndOn } from "./types/strex-match-end-on";
import { StrexPattern } from "./types/strex-pattern";
import { StrexMatch } from "./StrexMatch";
import { getPartsInPatternString } from "./pattern/get-parts-in-pattern-string";
import { matchPartsWithPatternInLines } from "./match/match-pattern-in-lines";

type StrExpOptions = {
  endOn?: StrexMatchEndOn;
  mustMatchAtLineStart?: boolean;
  mustMatchAtLineEnd?: boolean;
};

export class StrExp {
  readonly pattern: StrexPattern;

  constructor(patternString: string, options?: StrExpOptions) {
    const { endOn, mustMatchAtLineStart, mustMatchAtLineEnd } = options || {};

    this.pattern = {
      patternParts: getPartsInPatternString(patternString),
      mustMatchAtLineStart: Boolean(mustMatchAtLineStart),
      mustMatchAtLineEnd: Boolean(mustMatchAtLineEnd),
      endOn: endOn || { type: "pattern" },
    };
  }

  match<TVar extends string>(text: string): StrexMatch<TVar>[] {
    const lines = text.split("\n");
    return matchPartsWithPatternInLines({ lines, pattern: this.pattern });
  }
}
