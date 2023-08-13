import { StrexMatch } from "../StrexMatch";
import { StrexPattern } from "../types/strex-pattern";
import { matchPatternInLines } from "./match-pattern-in-lines";
import { matchPartRelativetoPosition } from "../match/match-part-relative-to-position";

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
		if (parts.length === 0) {
			startLineIndex++;
			continue;
		}

		const firstPart = parts[0];

		const partsLineIndex =
			firstPart.type === "text"
				? firstPart.lineIndex
				: firstPart.startLineIndex;

		const partsColumnIndex = firstPart.startColumnIndex;

		const offsetParts = parts.map((matchPart) =>
			matchPartRelativetoPosition({
				matchPart,
				lineIndex: partsLineIndex,
				columnIndex: partsColumnIndex,
			}),
		);

		const match = new StrexMatch({
			lines: theLines,
			partMatches: offsetParts,
			offsetLineIndex: startLineIndex + partsLineIndex,
			offsetColumnIndex: startColumnIndex + partsColumnIndex,
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
