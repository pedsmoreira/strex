import { StrexExp } from "./StrexExp";
import { StrexMatch } from "./StrexMatch";
import { StrexResult } from "./StrexResult";
import { StrexMatchEndOn } from "./types/strex-match-end-on";
import { StrexOptions } from "./types/strex-options";
import { StrexPart } from "./types/strex-part";
import { StrexPattern } from "./types/strex-pattern";

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
	StrexMatchEndOn,
	StrexOptions,
	StrexPart,
	StrexPattern,
};
