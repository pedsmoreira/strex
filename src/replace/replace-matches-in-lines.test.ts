import { expect, test } from "vitest";
import { StrexMatch } from "../StrexMatch";
import { replaceMatchesInLines } from "./replace-matches-in-lines";

test("replace with another string", () => {
	const lines = ["Hello world from the moon"];

	// "Hello @{{ what }} "
	const match = new StrexMatch({
		lines,
		partMatches: [
			{
				type: "text",
				text: "Hello ",
				lineIndex: 0,
				startColumnIndex: 0,
				endColumnIndex: 6,
			},
			{
				type: "variable",
				name: "what",
				value: "world",
				startLineIndex: 0,
				endLineIndex: 0,
				startColumnIndex: 6,
				endColumnIndex: 11,
			},
			{
				type: "text",
				text: ",",
				lineIndex: 0,
				startColumnIndex: 11,
				endColumnIndex: 12,
			},
		],
		offsetLineIndex: 0,
		offsetColumnIndex: 0,
	});

	const replacement = replaceMatchesInLines({
		lines,
		matches: [match],
		replace: () => "Hello replacement ",
	});

	expect(replacement).toEqual("Hello replacement from the moon");
});
