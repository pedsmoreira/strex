import { expect, test } from "vitest";
import { StrexMatch } from "../StrexMatch";
import { matchAllPatternsInLines } from "./match-all-patterns-in-lines";

test("single line", () => {
	const lines = ["#1; ...; #2;"];

	expect(
		matchAllPatternsInLines({
			lines,
			pattern: {
				patternParts: [
					{ type: "text", text: "#" },
					{ type: "variable", name: "number" },
					{ type: "text", text: ";" },
				],
				mustMatchAtLineStart: false,
				mustMatchAtLineEnd: false,
			},
		}),
	).toEqual([
		new StrexMatch({
			lines,
			partMatches: [
				{
					type: "text",
					text: "#",
					lineIndex: 0,
					startColumnIndex: 0,
					endColumnIndex: 1,
				},
				{
					type: "variable",
					name: "number",
					value: "1",
					startLineIndex: 0,
					endLineIndex: 0,
					startColumnIndex: 1,
					endColumnIndex: 2,
				},
				{
					type: "text",
					text: ";",
					lineIndex: 0,
					startColumnIndex: 2,
					endColumnIndex: 3,
				},
			],
			offsetColumnIndex: 0,
			offsetLineIndex: 0,
		}),
		new StrexMatch({
			lines,
			partMatches: [
				{
					type: "text",
					text: "#",
					lineIndex: 0,
					startColumnIndex: 0,
					endColumnIndex: 1,
				},
				{
					type: "variable",
					name: "number",
					value: "2",
					startLineIndex: 0,
					endLineIndex: 0,
					startColumnIndex: 1,
					endColumnIndex: 2,
				},
				{
					type: "text",
					text: ";",
					lineIndex: 0,
					startColumnIndex: 2,
					endColumnIndex: 3,
				},
			],
			offsetColumnIndex: 9,
			offsetLineIndex: 0,
		}),
	]);
});

test("multiple lines", () => {
	const lines = ["#1; ...; #2;", "#3; #4;", "#5; ...; #6;"];

	const firstLineMatches = [
		new StrexMatch({
			lines,
			partMatches: [
				{
					type: "text",
					text: "#",
					lineIndex: 0,
					startColumnIndex: 0,
					endColumnIndex: 1,
				},
				{
					type: "variable",
					name: "number",
					value: "1",
					startLineIndex: 0,
					endLineIndex: 0,
					startColumnIndex: 1,
					endColumnIndex: 2,
				},
				{
					type: "text",
					text: ";",
					lineIndex: 0,
					startColumnIndex: 2,
					endColumnIndex: 3,
				},
			],
			offsetColumnIndex: 0,
			offsetLineIndex: 0,
		}),
		new StrexMatch({
			lines,
			partMatches: [
				{
					type: "text",
					text: "#",
					lineIndex: 0,
					startColumnIndex: 0,
					endColumnIndex: 1,
				},
				{
					type: "variable",
					name: "number",
					value: "2",
					startLineIndex: 0,
					endLineIndex: 0,
					startColumnIndex: 1,
					endColumnIndex: 2,
				},
				{
					type: "text",
					text: ";",
					lineIndex: 0,
					startColumnIndex: 2,
					endColumnIndex: 3,
				},
			],
			offsetColumnIndex: 9,
			offsetLineIndex: 0,
		}),
	];

	const secondLineMatches = [
		new StrexMatch({
			lines,
			partMatches: [
				{
					type: "text",
					text: "#",
					lineIndex: 0,
					startColumnIndex: 0,
					endColumnIndex: 1,
				},
				{
					type: "variable",
					name: "number",
					value: "3",
					startLineIndex: 0,
					endLineIndex: 0,
					startColumnIndex: 1,
					endColumnIndex: 2,
				},
				{
					type: "text",
					text: ";",
					lineIndex: 0,
					startColumnIndex: 2,
					endColumnIndex: 3,
				},
			],
			offsetColumnIndex: 0,
			offsetLineIndex: 1,
		}),
		new StrexMatch({
			lines,
			partMatches: [
				{
					type: "text",
					text: "#",
					lineIndex: 0,
					startColumnIndex: 0,
					endColumnIndex: 1,
				},
				{
					type: "variable",
					name: "number",
					value: "4",
					startLineIndex: 0,
					endLineIndex: 0,
					startColumnIndex: 1,
					endColumnIndex: 2,
				},
				{
					type: "text",
					text: ";",
					lineIndex: 0,
					startColumnIndex: 2,
					endColumnIndex: 3,
				},
			],
			offsetColumnIndex: 4,
			offsetLineIndex: 1,
		}),
	];

	const thirdLineMatches = [
		new StrexMatch({
			lines,
			partMatches: [
				{
					type: "text",
					text: "#",
					lineIndex: 0,
					startColumnIndex: 0,
					endColumnIndex: 1,
				},
				{
					type: "variable",
					name: "number",
					value: "5",
					startLineIndex: 0,
					endLineIndex: 0,
					startColumnIndex: 1,
					endColumnIndex: 2,
				},
				{
					type: "text",
					text: ";",
					lineIndex: 0,
					startColumnIndex: 2,
					endColumnIndex: 3,
				},
			],
			offsetColumnIndex: 0,
			offsetLineIndex: 2,
		}),
		new StrexMatch({
			lines,
			partMatches: [
				{
					type: "text",
					text: "#",
					lineIndex: 0,
					startColumnIndex: 0,
					endColumnIndex: 1,
				},
				{
					type: "variable",
					name: "number",
					value: "6",
					startLineIndex: 0,
					endLineIndex: 0,
					startColumnIndex: 1,
					endColumnIndex: 2,
				},
				{
					type: "text",
					text: ";",
					lineIndex: 0,
					startColumnIndex: 2,
					endColumnIndex: 3,
				},
			],
			offsetColumnIndex: 9,
			offsetLineIndex: 2,
		}),
	];

	expect(
		matchAllPatternsInLines({
			lines,
			pattern: {
				patternParts: [
					{ type: "text", text: "#" },
					{ type: "variable", name: "number" },
					{ type: "text", text: ";" },
				],
				mustMatchAtLineStart: false,
				mustMatchAtLineEnd: false,
			},
		}),
	).toEqual([...firstLineMatches, ...secondLineMatches, ...thirdLineMatches]);
});
