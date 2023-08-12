import { expect, it } from "vitest";
import { escapeRegexString } from "./escape-regex-string";

it("escapes a regex string", () => {
	expect(escapeRegexString("^ and $")).toEqual("\\^ and \\$");
});
