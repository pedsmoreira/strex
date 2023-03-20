import { expect, it } from "vitest";
import { splitByLine } from "./split-by-line";

it("splits lines by \n", () => {
	expect(splitByLine("one\ntwo")).toEqual(["one", "two"]);
});
