import { expect, it } from "vitest";
import { splitByLine, StrexMatch } from "../strex";
import { replaceMatches } from "./replace-matches";

it("matches case #1", () => {
	const contents = `Sun is shining in the sky, there ain't a cloud in sight.`;
	const lines = splitByLine(contents);

	// "shining @{{ where }},"
	const match = new StrexMatch({
		lines,
		partMatches: [
			{
				type: "text",
				text: "shinin in the sky,",
				lineIndex: 0,
				startColumnIndex: 7,
				endColumnIndex: 26,
			},
		],
		offsetLineIndex: 0,
		offsetColumnIndex: 0,
	});

	const replacement = replaceMatches({
		contents,
		matches: [match],
		replace: () => "mooing like a cow!",
	});

	expect(replacement).toEqual(
		`Sun is mooing like a cow! there ain't a cloud in sight.`,
	);
});
