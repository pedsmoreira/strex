import { expect, it } from "vitest";
import { StrexMatch } from "../StrexMatch";
import { replaceMatches } from "./replace-matches";
import { splitByLine } from "../line-utils/split-by-line";

it("replaces matches", () => {
	const contents = "Hello world from the moon";
	const lines = splitByLine(contents);

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

	const replacement = replaceMatches({
		contents,
		matches: [match],
		replace: () => "Hello replacement ",
	});

	expect(replacement).toEqual("Hello replacement from the moon");
});
