import { expect, test } from "vitest";
import { getPartsInPatternString } from "./get-parts-in-pattern-string";

test("single part", () => {
	expect(
		getPartsInPatternString({ patternString: "hello world", variables: [] }),
	).toEqual([{ type: "text", text: "hello world" }]);
});

test("multiple parts", () => {
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
