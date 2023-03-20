import { expect, it } from "vitest";
import { linesForEndOn } from "./lines-for-end-on";

const lines = [
	"function helloWorld() {",
	"  // some comment with spaces",
	'\treturn { value: "hello world" }',
	"} // some comment with spaces",
	"more",
];

it("returns all lines for endOn=pattern", () => {
	expect(linesForEndOn({ lines, endOn: { type: "pattern" } })).toEqual(lines);
});

it("returns proper lines  for endOn=enclosing", () => {
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

it("returns all lines for endOn=tab-spacing", () => {
	expect(linesForEndOn({ lines, endOn: { type: "tab-spacing" } })).toEqual([
		"function helloWorld() {",
		"  // some comment with spaces",
		'\treturn { value: "hello world" }',
	]);
});

it("returns all lines for endOn=single-line", () => {
	expect(linesForEndOn({ lines, endOn: { type: "single-line" } })).toEqual(
		lines.slice(0, 1),
	);
});
