import { matchAllPatternsInLines } from "./match/match-all-patterns-in-lines";
import { getPartsInPatternString } from "./pattern/get-parts-in-pattern-string";
import { splitByLine } from "./line-utils/split-by-line";
import { StrexResult } from "./StrexResult";
import { StrexOptions } from "./types/strex-options";
import { StrexPattern } from "./types/strex-pattern";

export class StrexExp {
	readonly pattern: StrexPattern;

	constructor(patternString: string, options?: StrexOptions) {
		const { endOn, mustMatchAtLineStart, mustMatchAtLineEnd } = options || {};

		this.pattern = {
			patternParts: getPartsInPatternString(patternString),
			mustMatchAtLineStart: Boolean(mustMatchAtLineStart),
			mustMatchAtLineEnd: Boolean(mustMatchAtLineEnd),
			endOn: endOn || { type: "pattern" },
		};
	}

	match<TVar extends string>(text: string): StrexResult<TVar> {
		const lines = splitByLine(text);
		const matches = matchAllPatternsInLines({ lines, pattern: this.pattern });

		return new StrexResult(matches);
	}
}
