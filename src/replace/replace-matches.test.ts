import { replaceMatches } from "./replace-matches";
import { describe, it, expect } from "vitest";

describe("replaceMatches", () => {
	it("matches case #1", () => {
		const contents = `Sun is shining in the sky, there ain't a cloud in sight.`;

		// "shining @{{ where }},"

		const replacement = replaceMatches({
			contents,
			matches: [],
			replace: () => "mooing like a cow!",
		});

		expect(replacement).toEqual(
			`Sun is mooing like a cow! there ain't a cloud in sight.`,
		);
	});
});
