import { expect, it } from "vitest";
import { matchTuplesInLines } from "./match-tuples-in-lines";

it("returns match parts given a tuple with text only", () => {
	expect(
		matchTuplesInLines({
			lines: [`import oneReducer from '../redux/one';`],
			tuple: [undefined, { type: "text", text: "import " }],
			mustMatchAtLineStart: true,
			mustMatchAtLineEnd: false,
		}),
	).toEqual([
		{
			type: "text",
			text: "import ",
			lineIndex: 0,
			startColumnIndex: 0,
			endColumnIndex: 7,
		},
	]);
});

it("returns match parts given a tuple with variable + text", () => {
	expect(
		matchTuplesInLines({
			lines: [`oneReducer from '../redux/one';`],
			tuple: [
				{ type: "variable", name: "imports" },
				{ type: "text", text: " from '" },
			],
			mustMatchAtLineStart: true,
			mustMatchAtLineEnd: false,
		}),
	).toEqual([
		{
			type: "variable",
			name: "imports",
			value: "oneReducer",
			startLineIndex: 0,
			startColumnIndex: 0,
			endLineIndex: 0,
			endColumnIndex: 10,
		},
		{
			type: "text",
			text: " from '",
			lineIndex: 0,
			startColumnIndex: 10,
			endColumnIndex: 17,
		},
	]);
});
