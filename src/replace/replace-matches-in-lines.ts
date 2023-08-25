import { sliceLines } from "../line-utils/slice-lines";
import { splitByLine } from "../line-utils/split-by-line";
import { joinLines } from "../line-utils/join-lines";
import { StrexMatch } from "../StrexMatch";

function matchString(match: StrexMatch<string>) {
	return `${match.startLineIndex}:${match.startColumnIndex}`;
}

type Args<TVar extends string> = {
	lines: string[];
	matches: StrexMatch<TVar>[];
	replace: (part: StrexMatch<TVar>) => string;
};

export function replaceMatchesInLines<TVar extends string>({
	lines,
	matches,
	replace,
}: Args<TVar>): string {
	// Must remove the last lines first otherwise the indexes will be incorrect
	const sortedMatches = matches
		.sort((matchA, matchB) => {
			const matchAString = matchString(matchA);
			const matchBString = matchString(matchB);

			const [first] = [matchAString, matchBString].sort();
			return matchAString === first ? -1 : 1;
		})
		.reverse();

	let newLines = [...lines];

	sortedMatches.forEach((match) => {
		const before = sliceLines({
			lines: newLines,
			startLineIndex: 0,
			startColumnIndex: 0,
			endLineIndex: match.startLineIndex,
			endColumnIndex: match.startColumnIndex,
		});

		const after = sliceLines({
			lines: newLines,
			startLineIndex: match.endLineIndex,
			startColumnIndex: match.endColumnIndex,
			endLineIndex: newLines.length - 1,
			endColumnIndex: newLines[newLines.length - 1].length,
		});

		const replacement = replace(match);
		const newContent = `${joinLines(before)}${replacement}${joinLines(after)}`;
		newLines = splitByLine(newContent);
	});

	return joinLines(newLines);
}
