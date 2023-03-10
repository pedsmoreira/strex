import { StrexMatchEndOn } from "./strex-match-end-on";
import { StrexPart } from "./strex-part";

export type StrexPattern = {
  patternParts: StrexPart[];
  endOn: StrexMatchEndOn;
  mustMatchAtLineStart: boolean;
  mustMatchAtLineEnd: boolean;
};
