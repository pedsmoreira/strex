import { matchPartRelativetoPosition } from "./match-part-relative-to-position";
import { expect, test } from "vitest";

test("match part on the same line", () => {
	const adjustedMatch = matchPartRelativetoPosition({
		matchPart: {
			type: "text",
			lineIndex: 2,
			startColumnIndex: 8,
			endColumnIndex: 19,
			text: "hello world",
		},
		lineIndex: 2,
		columnIndex: 7,
	});

	expect(adjustedMatch).toEqual({
		type: "text",
		lineIndex: 0,
		startColumnIndex: 1,
		endColumnIndex: 12,
		text: "hello world",
	});
});

test("match part on the same line and columnIndex", () => {
	const adjustedMatch = matchPartRelativetoPosition({
		matchPart: {
			type: "text",
			lineIndex: 2,
			startColumnIndex: 8,
			endColumnIndex: 19,
			text: "hello world",
		},
		lineIndex: 2,
		columnIndex: 8,
	});

	expect(adjustedMatch).toEqual({
		type: "text",
		lineIndex: 0,
		startColumnIndex: 0,
		endColumnIndex: 11,
		text: "hello world",
	});
});

test("match part on a different line", () => {
	const adjustedMatch = matchPartRelativetoPosition({
		matchPart: {
			type: "text",
			lineIndex: 2,
			startColumnIndex: 8,
			endColumnIndex: 19,
			text: "hello world",
		},
		lineIndex: 1,
		columnIndex: 16,
	});

	expect(adjustedMatch).toEqual({
		type: "text",
		lineIndex: 1,
		startColumnIndex: 8,
		endColumnIndex: 19,
		text: "hello world",
	});
});
