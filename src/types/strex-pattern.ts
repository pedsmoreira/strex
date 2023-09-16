import { StrexPatternPart } from "./strex-pattern-part";

export type StrexPattern<TVar extends string> = {
	patternParts: StrexPatternPart<TVar>[];
	mustMatchAtLineStart: boolean;
	mustMatchAtLineEnd: boolean;
};
