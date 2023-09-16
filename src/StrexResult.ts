import { StrexMatch } from "./StrexMatch";
import { replaceMatchesInLines } from "./replace/replace-matches-in-lines";

export class StrexResult<TVar extends string> {
	readonly lines: string[];
	readonly matches: StrexMatch<TVar>[];

	constructor(data: { lines: string[]; matches: StrexMatch<TVar>[] }) {
		this.lines = data.lines;
		this.matches = data.matches;
	}

	replaceMatches(replace: (part: StrexMatch<TVar>) => string): string {
		return replaceMatchesInLines({
			lines: this.lines,
			matches: this.matches,
			replace,
		});
	}
}
