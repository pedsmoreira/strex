import { it, expect } from "vitest";
import { joinLines } from "./join-lines";

it("join lines with \n", () => {
	expect(joinLines(["one", "two"])).toEqual("one\ntwo");
});
