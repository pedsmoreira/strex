import { StrexMatch } from "../StrexMatch";
import { sliceLines } from "../line-utils/slice-lines";
import { StrexPattern } from "../types/strex-pattern";
import { createMatchFromParts } from "./create-match-from-parts";
import { matchPatternInLines } from "./match-pattern-in-lines";

type Args<T extends string> = {
	lines: string[];
	pattern: StrexPattern;
	recursion?: {
		originalLines: string[];
		matches: StrexMatch<T>[];
		offsetLineIndex: number;
		offsetColumnIndex: number;
	};
};

export function matchAllPatternsInLines<T extends string>({
	lines,
	pattern,
	recursion,
}: Args<T>): StrexMatch<T>[] {
	if (lines.filter(Boolean).length === 0) return recursion?.matches || [];

	const originalLines = recursion?.originalLines || lines;
	const parts = matchPatternInLines({ lines, pattern });

	if (parts.length === 0) {
		return matchAllPatternsInLines({
			lines: lines.slice(1),
			pattern,
			recursion: {
				originalLines,
				matches: recursion?.matches ?? [],
				offsetLineIndex: (recursion?.offsetLineIndex ?? 0) + 1,
				offsetColumnIndex: 0,
			},
		});
	}

	const match = createMatchFromParts({
		lines: originalLines,
		parts,
		offsetLineIndex: recursion?.offsetLineIndex ?? 0,
		offsetColumnIndex: recursion?.offsetColumnIndex ?? 0,
	});

	const lastPart = parts[parts.length - 1];
	const endLineIndex =
		lastPart.type === "text" ? lastPart.lineIndex : lastPart.endLineIndex;

	const remainingLines = sliceLines({
		lines,
		startLineIndex: endLineIndex,
		startColumnIndex: lastPart.endColumnIndex,
	});

	return matchAllPatternsInLines({
		lines: remainingLines,
		pattern,
		recursion: {
			originalLines,
			matches: [...(recursion?.matches ?? []), match],
			offsetLineIndex: match.endLineIndex,
			offsetColumnIndex: match.endColumnIndex,
		},
	});
}
