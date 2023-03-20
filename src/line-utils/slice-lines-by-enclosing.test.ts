import { expect, it } from "vitest";
import { sliceLinesByEnclosing } from "./slice-lines-by-enclosing";

const lines = [
	"export function doIt(fn: () => void) {",
	'  console.log({ word: "hi" });',
	"}", // end
];

it("finds the enclosing ()", () => {
	expect(sliceLinesByEnclosing({ lines, open: "(", close: ")" })).toEqual({
		lines: ["export function doIt(fn: () => void)"],
		endLineIndex: 0,
		endColumnIndex: 36,
	});
});

it("finds the enclosing {}", () => {
	expect(sliceLinesByEnclosing({ lines, open: "{", close: "}" })).toEqual({
		lines: [
			"export function doIt(fn: () => void) {",
			'  console.log({ word: "hi" });',
			"}",
		],
		endLineIndex: 2,
		endColumnIndex: 1,
	});
});
