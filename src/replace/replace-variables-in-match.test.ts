import { expect, it } from "vitest";
import { replaceVariablesInMatch } from "./replace-variables-in-match";
import { StrexMatch } from "../StrexMatch";
import { splitByLine } from "../line-utils/split-by-line";

it("replaces variable in case #1", () => {
	const contents = "Hello world from the moon";
	const lines = splitByLine(contents);

	// "Hello @{{ world }} "
	const match = new StrexMatch<"what">({
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

	const replacement = replaceVariablesInMatch({
		match,
		variables: { what: "people" },
	});

	expect(replacement).toEqual("Hello people,");
});
