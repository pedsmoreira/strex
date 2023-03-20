import { sliceLines } from "../line-utils/slice-lines";
import { splitByLine } from "../line-utils/split-by-line";
import { joinLines } from "../strex";
import { StrexMatch } from "../StrexMatch";

type Args<T extends string> = {
	contents: string;
	matches: StrexMatch<T>[];
	replace: (part: StrexMatch<T>) => string;
};

function matchString(match: StrexMatch<string>) {
	return `${match.startLineIndex}:${match.startColumnIndex}`;
}

export function replaceMatches<T extends string>({
	contents,
	matches,
	replace,
}: Args<T>): string {
	const lines = splitByLine(contents);

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
