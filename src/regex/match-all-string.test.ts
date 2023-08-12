import { expect, it } from "vitest";
import { matchAllString } from "./match-all-string";

it("matches all strings", () => {
	expect(
		matchAllString({
			haystack: "Hello world from another world",
			needle: "world",
		}),
	).toEqual([
		{ startIndex: 6, text: "world" },
		{ startIndex: 25, text: "world" },
	]);
});
