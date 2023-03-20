import { sliceLines } from "../line-utils/slice-lines";
import { matchAllString } from "../regex/match-all-string";

type Args = {
	lines: string[];
	open: string;
	close: string;
};

export function sliceLinesByEnclosing({ lines, open, close }: Args): {
	lines: string[];
	endLineIndex: number;
	endColumnIndex: number;
} {
	let count = 0;

	for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
		const line = lines[lineIndex];

		const openMatches = matchAllString({ haystack: line, needle: open }).map(
			(match) => ({ type: "open", match }),
		);

		const closeMatches = matchAllString({ haystack: line, needle: close }).map(
			(match) => ({ type: "close", match }),
		);

		const sortedTypedMatches = [...openMatches, ...closeMatches].sort(
			(typedMatchA, typedMatchB) => {
				const matchAIndex = typedMatchA.match.startIndex;
				const matchBIndex = typedMatchB.match.startIndex;

				return matchAIndex < matchBIndex ? -1 : 1;
			},
		);

		for (
			let matchIndex = 0;
			matchIndex < sortedTypedMatches.length;
			matchIndex++
		) {
			const { type, match } = sortedTypedMatches[matchIndex];
			count += type === "open" ? 1 : -1;

			const matchEndColumnIndex = match.startIndex + match.text.length;

			if (count === 0)
				return {
					lines: sliceLines({
						lines,
						startLineIndex: 0,
						startColumnIndex: 0,
						endLineIndex: lineIndex,
						endColumnIndex: matchEndColumnIndex,
					}),
					endLineIndex: lineIndex,
					endColumnIndex: matchEndColumnIndex,
				};
		}
	}

	return {
		lines,
		endLineIndex: lines.length - 1,
		endColumnIndex: lines[lines.length - 1].length,
	};
}
