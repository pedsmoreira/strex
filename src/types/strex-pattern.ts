import { StrexMatchEndOn } from './strex-match-end-on';
import { StrexPatternPart } from './strex-pattern-part';

export type StrexPattern = {
  patternParts: StrexPatternPart[];
  endOn: StrexMatchEndOn;
  mustMatchAtLineStart: boolean;
  mustMatchAtLineEnd: boolean;
};
