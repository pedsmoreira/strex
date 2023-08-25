import { expect, test } from "vitest";
import { getPartsInPatternString } from "./get-parts-in-pattern-string";

test("matches case #1", () => {
	expect(
		getPartsInPatternString({
			patternString: "import @{{ name }} from '@{{ location }}';",
			variables: ["name", "location"],
		}),
	).toEqual([
		{ type: "text", text: "import " },
		{ type: "variable", name: "name" },
		{ type: "text", text: " from '" },
		{ type: "variable", name: "location" },
		{ type: "text", text: "';" },
	]);
});

test.fails("with variable missing", () => {
	getPartsInPatternString({
		patternString: "@{{ one }} and @{{ two }}",
		variables: ["one"],
	});
});

test.fails("with variable exceeding", () => {
	getPartsInPatternString({
		patternString: "@{{ one }} and @{{ two }}",
		variables: ["one", "two", "three"],
	});
});
