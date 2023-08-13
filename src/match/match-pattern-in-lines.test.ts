import { expect, it } from "vitest";
import { getPartsInPatternString } from "../pattern/get-parts-in-pattern-string";
import { StrexPattern } from "../types/strex-pattern";
import { matchPatternInLines } from "./match-pattern-in-lines";
import { joinLines } from "../line-utils/join-lines";

it("matches a pattern across lines", () => {
	const lines = [
		"this is line one",
		"this is line two",
		"this is the third line",
		"the line four",
	];

	const pattern: StrexPattern = {
		patternParts: getPartsInPatternString("line @{{ remaining }}"),
		mustMatchAtLineStart: false,
		mustMatchAtLineEnd: false,
		endOn: { type: "pattern" },
	};

	const parts = matchPatternInLines({ lines, pattern });

	expect(parts).toEqual([
		{
			type: "text",
			text: "line ",
			lineIndex: 0,
			startColumnIndex: 8,
			endColumnIndex: 13,
		},
		{
			type: "variable",
			name: "remaining",
			value: joinLines([
				"one",
				"this is line two",
				"this is the third line",
				"the line four",
			]),
			startLineIndex: 0,
			startColumnIndex: 13,
			endLineIndex: 3,
			endColumnIndex: 13,
		},
	]);
});
