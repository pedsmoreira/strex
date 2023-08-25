import { expect, it } from "vitest";
import { sliceLines } from "./slice-lines";

it("slices within a single line", () => {
	const slice = sliceLines({
		lines: ["Line one", "The line two", "A line three"],
		startLineIndex: 1,
		startColumnIndex: 9,
		endLineIndex: 1,
		endColumnIndex: 12,
	});

	expect(slice).toEqual(["two"]);
});

it("slices between lines", () => {
	const slice = sliceLines({
		lines: ["Line one", "The line two", "A line three"],
		startLineIndex: 1,
		startColumnIndex: 4,
		endLineIndex: 2,
		endColumnIndex: 6,
	});

	expect(slice).toEqual(["line two", "A line"]);
});

it("slices line until the end when end line when it is not provided", () => {
	// TODO
});

it("removes first line if it is empty because the slice ended at the end of the previous one", () => {
	// TODO
});

it("does not remove first line whe nempty if it was provided empty", () => {
	// TODO
});
