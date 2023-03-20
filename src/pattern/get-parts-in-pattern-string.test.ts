import { expect, it } from "vitest";
import { getPartsInPatternString } from "./get-parts-in-pattern-string";

it("matches case #1", () => {
	expect(
		getPartsInPatternString("import @{{ name }} from '@{{ location }}';"),
	).toEqual([
		{ type: "text", text: "import " },
		{ type: "variable", name: "name" },
		{ type: "text", text: " from '" },
		{ type: "variable", name: "location" },
		{ type: "text", text: "';" },
	]);
});
