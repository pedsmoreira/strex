import { joinLines } from "./line-utils/join-lines";
import { StrexPartMatch } from "./types/strex-part-match";
import { isVariablePartMatch } from "./utils/is-variable-part-match";
import { sliceLines } from "./line-utils/slice-lines";
import { replaceVariablesInPartMatches } from "./replace/replace-variables-in-match";

export class StrexMatch<TVar extends string> {
	readonly lines: string[];
	readonly partMatches: StrexPartMatch<TVar>[];
	readonly offsetLineIndex: number;
	readonly offsetColumnIndex: number;

	constructor(data: {
		lines: string[];
		partMatches: StrexPartMatch<TVar>[];
		offsetLineIndex: number;
		offsetColumnIndex: number;
	}) {
		this.lines = data.lines;
		this.partMatches = data.partMatches;
		this.offsetLineIndex = data.offsetLineIndex;
		this.offsetColumnIndex = data.offsetColumnIndex;
	}

	get variables(): Record<TVar, string> {
		return this.partMatches
			.filter(isVariablePartMatch)
			.reduce(
				(acc, part) => ({ ...acc, [part.name as TVar]: part.value }),
				{},
			) as Record<TVar, string>;
	}

	get firstPartMatch() {
		return this.partMatches[0];
	}

	get lastPartMatch() {
		return this.partMatches[this.partMatches.length - 1];
	}

	/**
	 * Alias for `offsetLineIndex`
	 *
	 * The first match part always has line index 0
	 */
	get startLineIndex(): number {
		return this.offsetLineIndex;
	}

	get endLineIndex(): number {
		const lastPartMatch = this.partMatches[this.partMatches.length - 1];

		const endLineIndex =
			lastPartMatch.type === "text"
				? lastPartMatch.lineIndex
				: lastPartMatch.endLineIndex;

		return this.offsetLineIndex + endLineIndex;
	}

	/**
	 * Alias for `offsetColumnIndex`
	 *
	 * The first match part always has column index 0
	 */
	get startColumnIndex(): number {
		return this.offsetColumnIndex;
	}

	get endColumnIndex(): number {
		if (this.startLineIndex === this.endLineIndex) {
			return this.offsetColumnIndex + this.lastPartMatch.endColumnIndex;
		}

		return this.lastPartMatch.endColumnIndex;
	}

	get text(): string {
		return joinLines(this.matchedLines);
	}

	get matchedLines(): string[] {
		return sliceLines({
			lines: this.lines,
			startLineIndex: this.startLineIndex,
			startColumnIndex: this.startColumnIndex,
			endLineIndex: this.endLineIndex,
			endColumnIndex: this.endColumnIndex,
		});
	}

	replaceVariables(variables: Partial<Record<TVar, string>>): string {
		return replaceVariablesInPartMatches({
			partMatches: this.partMatches,
			variables,
		});
	}
}
