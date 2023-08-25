import { joinLines, strex } from "../dist/strex";
import { it, expect } from "vitest";

it("works for a simple pattern", () => {
	const result = strex({
		text: joinLines([
			"I have one apple here",
			"I have two oranges here",
			"I have three bananas here",
		]),
		patternString: "I have @{{ number }} ${{ fruit }} here",
		variables: ["number", "fruit"],
	});

	expect(result.matches[0].text).toEqual("I have one apple here");
	expect(result.matches[0].variables).toEqual({
		number: "one",
		fruit: "apple",
	});
});
