import { describe, expect, test } from "vitest";
import { matchText } from "./match-text";

describe("match anywhere", () => {
	test("text at the start", () => {
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

	test("text in the middle", () => {
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

	test("text at the end", () => {
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
	test("text at the start", () => {
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

	test("text not at the start", () => {
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
	test("text at the end", () => {
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

	test("text not at the end", () => {
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
