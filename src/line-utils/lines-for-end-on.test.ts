import { expect, test } from "vitest";
import { linesForEndOn } from "./lines-for-end-on";

const lines = [
	"function helloWorld() {",
	"  // some comment with spaces",
	'\treturn { value: "hello world" }',
	"} // some comment with spaces",
	"more",
];

test("endOn=pattern", () => {
	expect(linesForEndOn({ lines, endOn: { type: "pattern" } })).toEqual(lines);
});

test("endOn=enclosing", () => {
	expect(
		linesForEndOn({
			lines,
			endOn: { type: "enclosing", open: "{", close: "}" },
		}),
	).toEqual([
		"function helloWorld() {",
		"  // some comment with spaces",
		'\treturn { value: "hello world" }',
		"}",
	]);
});

test("endOn=tab-spacing", () => {
	expect(linesForEndOn({ lines, endOn: { type: "tab-spacing" } })).toEqual([
		"function helloWorld() {",
		"  // some comment with spaces",
		'\treturn { value: "hello world" }',
	]);
});

test("endOn=single-line", () => {
	expect(linesForEndOn({ lines, endOn: { type: "single-line" } })).toEqual(
		lines.slice(0, 1),
	);
});
