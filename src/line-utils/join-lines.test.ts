import { test, expect } from "vitest";
import { joinLines } from "./join-lines";

test("join lines", () => {
	expect(joinLines(["one", "two"])).toEqual("one\ntwo");
});
