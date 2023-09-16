import { expect, test } from "vitest";
import { sliceLines } from "./slice-lines";

test("within single line", () => {
	const slice = sliceLines({
		lines: ["Line one", "The line two", "A line three"],
		startLineIndex: 1,
		startColumnIndex: 9,
		endLineIndex: 1,
		endColumnIndex: 12,
	});

	expect(slice).toEqual(["two"]);
});

test("between lines", () => {
	const slice = sliceLines({
		lines: ["Line one", "The line two", "A line three"],
		startLineIndex: 1,
		startColumnIndex: 4,
		endLineIndex: 2,
		endColumnIndex: 6,
	});

	expect(slice).toEqual(["line two", "A line"]);
});

test("slices line until the end when end line when it is not provided", () => {
	const slice = sliceLines({
		lines: ["Line one", "The line two", "A line three"],
		startLineIndex: 1,
		startColumnIndex: 4,
	});

	expect(slice).toEqual(["line two", "A line three"]);
});
