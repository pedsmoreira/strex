import { StrexOptions } from "./types/strex-options";
import { StrexExp } from "./StrexExp";
import { StrexMatch } from "./StrexMatch";
import { StrexResult } from "./StrexResult";
import { splitByLine } from "./line-utils/split-by-line";
import { joinLines } from "./line-utils/join-lines";
import { StrexPattern } from "./types/strex-pattern";
import { StrexPart } from "./types/strex-part";
import { StrexMatchEndOn } from "./types/strex-match-end-on";

export function strex<TVar extends string>({
	text,
	patternString,
	options,
}: {
	text: string;
	patternString: string;
	options?: StrexOptions;
}): StrexResult<TVar> {
	return new StrexExp(patternString, options).match(text);
}

export {
	StrexExp,
	StrexMatch,
	splitByLine,
	joinLines,
	StrexPattern,
	StrexPart,
	StrexMatchEndOn,
	StrexOptions,
};
