import { expect, test } from "vitest";
import { getTuplesForParts } from "./get-tuples-for-parts";

test("starting with variable", () => {
	expect(
		getTuplesForParts([
			{ type: "variable", name: "variable-one" },
			{ type: "text", text: "text-one" },
			{ type: "variable", name: "variable-two" },
			{ type: "text", text: "text-two" },
		]),
	).toEqual([
		[
			{ type: "variable", name: "variable-one" },
			{ type: "text", text: "text-one" },
		],
		[
			{ type: "variable", name: "variable-two" },
			{ type: "text", text: "text-two" },
		],
	]);
});

test("starting with text", () => {
	expect(
		getTuplesForParts([
			{ type: "text", text: "text-one" },
			{ type: "variable", name: "variable-two" },
			{ type: "text", text: "text-two" },
		]),
	).toEqual([
		[undefined, { type: "text", text: "text-one" }],
		[
			{ type: "variable", name: "variable-two" },
			{ type: "text", text: "text-two" },
		],
	]);
});

test("ending with variable", () => {
	expect(
		getTuplesForParts([
			{ type: "variable", name: "variable-one" },
			{ type: "text", text: "text-one" },
			{ type: "variable", name: "variable-two" },
			{ type: "text", text: "text-two" },
			{ type: "variable", name: "variable-three" },
		]),
	).toEqual([
		[
			{ type: "variable", name: "variable-one" },
			{ type: "text", text: "text-one" },
		],
		[
			{ type: "variable", name: "variable-two" },
			{ type: "text", text: "text-two" },
		],
		[{ type: "variable", name: "variable-three" }, undefined],
	]);
});
