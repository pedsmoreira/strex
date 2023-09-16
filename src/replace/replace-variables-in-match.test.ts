import { expect, test } from "vitest";
import { replaceVariablesInPartMatches } from "./replace-variables-in-match";
import { StrexMatch } from "../StrexMatch";
import { splitByLine } from "../line-utils/split-by-line";

test("variable replacement", () => {
	const contents = "Hello world from the moon";

	// "Hello @{{ what }} "
	const partMatches = [
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
	];

	const replacement = replaceVariablesInPartMatches({
		partMatches,
		variables: { what: "people" },
	});

	expect(replacement).toEqual("Hello people,");
});
