import { expect, it } from "vitest";
import { getPartsInPatternString } from "../pattern/get-parts-in-pattern-string";
import { StrexPattern } from "../strex";
import { matchPatternInLines } from "./match-pattern-in-lines";

it("matches a pattern across lines", () => {
	const lines = [
		"a green leaf flying",
		"a orange moon rising",
		"this green poem",
		"was create for a green test",
	];

	const pattern: StrexPattern = {
		patternParts: getPartsInPatternString("green @{{ name }}"),
		mustMatchAtLineStart: false,
		mustMatchAtLineEnd: false,
		endOn: { type: "pattern" },
	};

	const parts = matchPatternInLines({ lines, pattern });
	expect(parts).toEqual([
		{
			type: "text",
			text: "green ",
			lineIndex: 0,
			startColumnIndex: 2,
			endColumnIndex: 8,
		},
		{
			type: "variable",
			name: "name",
			value:
				"leaf flying\n" +
				"a orange moon rising\n" +
				"this green poem\n" +
				"was create for a green test",
			startLineIndex: 0,
			startColumnIndex: 8,
			endLineIndex: 3,
			endColumnIndex: 26,
		},
	]);
});
