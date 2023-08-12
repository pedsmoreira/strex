import { StrexPartMatch } from "../types/strex-part-match";
import { StrexPattern } from "../types/strex-pattern";
import { linesForEndOn } from "../line-utils/lines-for-end-on";
import { matchTuplesInLines } from "./match-tuples-in-lines";
import { matchPartWithOffset } from "./match-part-with-offset";
import { getTuplesForParts } from "../pattern/get-tuples-for-parts";
import { sliceLines } from "../line-utils/slice-lines";

type Args = {
	lines: string[];
	pattern: StrexPattern;
};

export function matchPatternInLines<T extends string>({
	lines: originalLines,
	pattern,
}: Args): StrexPartMatch<T>[] {
	const { patternParts, mustMatchAtLineStart, mustMatchAtLineEnd, endOn } =
		pattern;

	const slicedLines = linesForEndOn({ lines: originalLines, endOn });

	const tuples = getTuplesForParts(patternParts);
	const matchParts: StrexPartMatch<T>[] = [];

	for (let i = 0; i < tuples.length; i++) {
		if (slicedLines.length === 0) return [];

		const tuple = tuples[i];

		const lastMatchPart =
			matchParts.length > 0 ? matchParts[matchParts.length - 1] : undefined;

		const lastMatchEndLineIndex = lastMatchPart
			? lastMatchPart.type === "text"
				? lastMatchPart.lineIndex
				: lastMatchPart.endLineIndex
			: 0;

		const [firstLine, ...otherLines] = sliceLines({
			lines: slicedLines,
			startLineIndex: lastMatchEndLineIndex,
			startColumnIndex: lastMatchPart ? lastMatchPart.endColumnIndex : 0,
		});

		const slicedFirstLine = lastMatchPart
			? firstLine.substring(lastMatchPart.endColumnIndex)
			: firstLine;

		// The offsets are incorrect - the Match has an offset,
		// each part's index is relative to the start of the match
		//
		// therefore, the first part always has index column 0
		// and index line 0

		const lines = [slicedFirstLine, ...otherLines];

		const isFirstTuple = i === 0;
		const isLastTuple = i === tuples.length - 1;

		const tupleMatches = matchTuplesInLines<T>({
			lines,
			tuple,
			mustMatchAtLineStart: mustMatchAtLineStart || !isFirstTuple,
			mustMatchAtLineEnd: mustMatchAtLineEnd && isLastTuple,
		});

		if (tupleMatches.length === 0) return [];

		const firstTupleMatch = tupleMatches[0];
		const offsetTupleMatches = tupleMatches.map((matchPart) =>
			matchPartWithOffset({
				matchPart,
				offsetStartLineIndex:
					firstTupleMatch.type === "text"
						? firstTupleMatch.lineIndex
						: firstTupleMatch.startLineIndex,
				offsetColumnIndex: firstTupleMatch.startColumnIndex,
			}),
		);

		matchParts.push(...offsetTupleMatches);
	}

	return matchParts;
}
