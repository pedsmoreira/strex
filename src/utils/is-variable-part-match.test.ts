import { expect, it } from "vitest";
import { isVariablePartMatch } from "./is-variable-part-match";

it("returns true for a varaible part match", () => {
	expect(
		isVariablePartMatch({
			type: "variable",
			name: "var",
			value: "one",
			startLineIndex: 0,
			endLineIndex: 0,
			startColumnIndex: 1,
			endColumnIndex: 0,
		}),
	).toBeTruthy();
});

it("returns false for a text part match", () => {
	expect(
		isVariablePartMatch({
			type: "text",
			text: "one",
			lineIndex: 0,
			startColumnIndex: 0,
			endColumnIndex: 1,
		}),
	).toBeFalsy();
});
