import { expect, test } from "vitest";
import { sliceLinesByEnclosing } from "./slice-lines-by-enclosing";

const lines = [
	"export function doIt(fn: () => void) {",
	'  console.log({ word: "hi" });',
	"}", // end
];

test("enclosing ()", () => {
	expect(sliceLinesByEnclosing({ lines, open: "(", close: ")" })).toEqual({
		lines: ["export function doIt(fn: () => void)"],
		endLineIndex: 0,
		endColumnIndex: 36,
	});
});

test("enclosing {}", () => {
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
