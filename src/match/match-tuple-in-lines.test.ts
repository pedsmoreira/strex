import { expect, it } from "vitest";
import { matchTupleInLines } from "./match-tuple-in-lines";

it("returns match parts given a tuple with text only", () => {
	expect(
		matchTupleInLines({
			lines: ["hello world from the moon"],
			tuple: [undefined, { type: "text", text: "hello " }],
			mustMatchAtLineStart: true,
			mustMatchAtLineEnd: false,
		}),
	).toEqual([
		{
			type: "text",
			text: "hello ",
			lineIndex: 0,
			startColumnIndex: 0,
			endColumnIndex: 6,
		},
	]);
});

it("returns match parts given a tuple with variable only", () => {
	expect(
		matchTupleInLines({
			lines: ["hello world from the moon"],
			tuple: [{ type: "variable", name: "remainder" }, undefined],
			mustMatchAtLineStart: true,
			mustMatchAtLineEnd: false,
		}),
	).toEqual([
		{
			type: "variable",
			name: "remainder",
			value: "hello world from the moon",
			startLineIndex: 0,
			endLineIndex: 0,
			startColumnIndex: 0,
			endColumnIndex: 25,
		},
	]);
});

it("returns match parts given a tuple with variable + text", () => {
	expect(
		matchTupleInLines({
			lines: ["hello world from the moon"],
			tuple: [
				{ type: "variable", name: "what" },
				{ type: "text", text: " from " },
			],
			mustMatchAtLineStart: true,
			mustMatchAtLineEnd: false,
		}),
	).toEqual([
		{
			type: "variable",
			name: "what",
			value: "hello world",
			startLineIndex: 0,
			startColumnIndex: 0,
			endLineIndex: 0,
			endColumnIndex: 11,
		},
		{
			type: "text",
			text: " from ",
			lineIndex: 0,
			startColumnIndex: 11,
			endColumnIndex: 17,
		},
	]);
});
