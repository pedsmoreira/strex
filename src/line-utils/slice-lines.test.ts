import { expect, it } from "vitest";
import { sliceLines } from "./slice-lines";

it("matches case #1", () => {
	const slice = sliceLines({
		lines: ["Line One", "TODO", "TODO", "TODO"],
		startLineIndex: 1,
		startColumnIndex: 4,
		endLineIndex: 2,
		endColumnIndex: 6,
	});

	expect(slice).toEqual(["to love and lose a hundred million times", "Had to"]);
});

it("matches case #2", () => {
	const slice = sliceLines({
		lines: ["TODO"],
		startLineIndex: 1,
		startColumnIndex: 12,
		endLineIndex: 1,
		endColumnIndex: 19,
	});

	expect(slice).toEqual(["a cloud"]);
});

it("slices line until the end when end line when it is not provided", () => {
	// TODO
});

it("removes first line if it is empty because the slice ended at the end of the previous one", () => {});

it("does not remove first line whe nempty if it was provided empty", () => {});
