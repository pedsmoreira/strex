import { StrexMatch } from "../StrexMatch";
import { sliceLines } from "../line-utils/slice-lines";
import { StrexPattern } from "../types/strex-pattern";
import { createMatchFromParts } from "./create-match-from-parts";
import { matchPatternInLines } from "./match-pattern-in-lines";

type Args<TVar extends string> = {
	lines: string[];
	pattern: StrexPattern<TVar>;
	recursion?: {
		originalLines: string[];
		matches: StrexMatch<TVar>[];
		offsetLineIndex: number;
		offsetColumnIndex: number;
	};
};

export function matchAllPatternsInLines<TVar extends string>({
	lines,
	pattern,
	recursion,
}: Args<TVar>): StrexMatch<TVar>[] {
	const originalLines = recursion?.originalLines || lines;
	const matches = recursion?.matches ?? [];
	const offsetLineIndex = recursion?.offsetLineIndex ?? 0;
	const offsetColumnIndex = recursion?.offsetColumnIndex ?? 0;

	if (lines.filter(Boolean).length === 0) return matches;

	const parts = matchPatternInLines({ lines, pattern });

	if (parts.length === 0) {
		return matchAllPatternsInLines({
			lines: lines.slice(1),
			pattern,
			recursion: {
				originalLines,
				matches,
				offsetLineIndex: offsetLineIndex + 1,
				offsetColumnIndex: 0,
			},
		});
	}

	const match = createMatchFromParts({
		lines: originalLines,
		parts,
		offsetLineIndex,
		offsetColumnIndex,
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
			matches: [...matches, match],
			offsetLineIndex: match.endLineIndex,
			offsetColumnIndex: match.endColumnIndex,
		},
	});
}
