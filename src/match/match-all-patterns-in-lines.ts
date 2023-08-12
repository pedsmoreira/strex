import { StrexMatch } from "../StrexMatch";
import { StrexPattern } from "../types/strex-pattern";
import { matchPatternInLines } from "./match-pattern-in-lines";

type Args = {
	lines: string[];
	pattern: StrexPattern;
};

export function matchAllPatternsInLines<T extends string>({
	lines,
	pattern,
}: Args): StrexMatch<T>[] {
	const matches: StrexMatch<T>[] = [];

	let loops = 0;

	let startLineIndex = 0;
	let startColumnIndex = 0;

	while (startLineIndex < lines.length) {
		loops++;
		if (loops > lines.length + pattern.patternParts.length) {
			throw new Error("infinite loop!");
		}

		const [firstLine, ...otherLines] = lines.slice(startLineIndex);
		const slicedFirstLine = firstLine.substring(startColumnIndex);
		const theLines = [slicedFirstLine, ...otherLines];

		const parts = matchPatternInLines({ lines: theLines, pattern });

		if (!parts?.length) {
			startLineIndex++;
			continue;
		}

		const match = new StrexMatch({
			lines: theLines,
			partMatches: parts,
			offsetLineIndex: startLineIndex,
			offsetColumnIndex: startColumnIndex,
		});

		matches.push(match);

		// Move the iterator to the end of the match
		const isEndOfLine =
			match.endColumnIndex === lines[match.endLineIndex].length;

		if (isEndOfLine) {
			startLineIndex = match.endLineIndex + 1;
			startColumnIndex = 0;
		} else {
			startLineIndex = match.endLineIndex;
			startColumnIndex = match.endColumnIndex;
		}
	}

	return matches;
}
