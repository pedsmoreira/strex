import { StrexMatchEndOn } from "./strex-match-end-on";
import { StrexPatternPart } from "./strex-pattern-part";

export type StrexPattern<TVar extends string> = {
	patternParts: StrexPatternPart<TVar>[];
	endOn: StrexMatchEndOn;
	mustMatchAtLineStart: boolean;
	mustMatchAtLineEnd: boolean;
};
