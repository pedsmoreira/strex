import { expect, it } from "vitest";
import { sliceLinesByTabSpacing } from "./slice-lines-by-tab-spacing";

it("finds the enclosing tab", () => {
	const lines = [
		"if x == 1:",
		"\t# indented tab",
		'\tprint("x is 1.")',
		"else:",
		'\tprint("x is 2")',
	];

	expect(sliceLinesByTabSpacing(lines)).toEqual([
		"if x == 1:",
		"\t# indented tab",
		'\tprint("x is 1.")',
	]);
});

it("finds the enclosing space", () => {
	const lines = [
		"if x == 1:",
		"    # indented four spaces",
		'    print("x is 1.")',
		"else:",
		'    print("x is 2")',
	];

	expect(sliceLinesByTabSpacing(lines)).toEqual([
		"if x == 1:",
		"    # indented four spaces",
		'    print("x is 1.")',
	]);
});
