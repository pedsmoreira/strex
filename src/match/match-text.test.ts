import { describe, expect, it } from "vitest";
import { matchText } from "./match-text";

describe("match anywhere", () => {
	it("matches at the start", () => {
		expect(
			matchText({
				needle: "hello",
				haystack: "hello world from the moon",
				mustMatchAtLineStart: false,
				mustMatchAtLineEnd: false,
			}),
		).toEqual({
			startColumnIndex: 0,
			endColumnIndex: 5,
		});
	});

	it("matches in the middle", () => {
		expect(
			matchText({
				needle: " from ",
				haystack: "hello world from the moon",
				mustMatchAtLineStart: false,
				mustMatchAtLineEnd: false,
			}),
		).toEqual({
			startColumnIndex: 11,
			endColumnIndex: 17,
		});
	});

	it("matches at the end", () => {
		expect(
			matchText({
				needle: "moon",
				haystack: "hello world from the moon",
				mustMatchAtLineStart: false,
				mustMatchAtLineEnd: true,
			}),
		).toEqual({
			startColumnIndex: 21,
			endColumnIndex: 25,
		});
	});
});

describe("must match at line start", () => {
	it("matches text at the start", () => {
		expect(
			matchText({
				needle: "hello",
				haystack: "hello world from the moon",
				mustMatchAtLineStart: true,
				mustMatchAtLineEnd: false,
			}),
		).toEqual({
			startColumnIndex: 0,
			endColumnIndex: 5,
		});
	});

	it("does not match text is present but not at the start", () => {
		expect(
			matchText({
				needle: " from ",
				haystack: "hello world from the moon",
				mustMatchAtLineStart: true,
				mustMatchAtLineEnd: false,
			}),
		).toBeUndefined();
	});
});

describe("must match at line end", () => {
	it("matches text at the end", () => {
		expect(
			matchText({
				needle: "moon",
				haystack: "hello world from the moon",
				mustMatchAtLineStart: false,
				mustMatchAtLineEnd: true,
			}),
		).toEqual({
			startColumnIndex: 21,
			endColumnIndex: 25,
		});
	});

	it("does not match if text is not at the end", () => {
		expect(
			matchText({
				needle: "hello",
				haystack: "hello world from the moon",
				mustMatchAtLineStart: false,
				mustMatchAtLineEnd: true,
			}),
		).toBeUndefined();
	});
});
