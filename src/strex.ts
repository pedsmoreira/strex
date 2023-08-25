import { StrexMatch } from "./StrexMatch";
import { StrexResult } from "./StrexResult";
import { splitByLine } from "./line-utils/split-by-line";
import { joinLines } from "./line-utils/join-lines";
import { matchAllPatternsInLines } from "./match/match-all-patterns-in-lines";
import { getPartsInPatternString } from "./pattern/get-parts-in-pattern-string";
import { StrexMatchEndOn } from "./types/strex-match-end-on";
import { StrexOptions } from "./types/strex-options";
import { StrexPart } from "./types/strex-part";
import { StrexPattern } from "./types/strex-pattern";

export function strex<TVar extends string>({
	text,
	patternString,
	options,
	variables,
}: {
	text: string;
	patternString: string;
	options?: StrexOptions;
	variables: TVar[];
}): StrexResult<TVar> {
	const pattern = {
		patternParts: getPartsInPatternString({ patternString, variables }),
		mustMatchAtLineStart: Boolean(options?.mustMatchAtLineStart),
		mustMatchAtLineEnd: Boolean(options?.mustMatchAtLineEnd),
		endOn: options?.endOn || { type: "pattern" },
	};

	const lines = splitByLine(text);
	const matches = matchAllPatternsInLines({ lines, pattern });

	return new StrexResult({ lines, matches });
}

export {
	StrexMatch,
	StrexMatchEndOn,
	StrexOptions,
	StrexPart,
	StrexPattern,
	StrexResult,
	joinLines,
	splitByLine,
};
