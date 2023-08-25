import { StrexMatchEndOn } from "./strex-match-end-on";
import { StrexPart } from "./strex-part";

export type StrexPattern<TVar extends string> = {
	patternParts: StrexPart<TVar>[];
	endOn: StrexMatchEndOn;
	mustMatchAtLineStart: boolean;
	mustMatchAtLineEnd: boolean;
};
