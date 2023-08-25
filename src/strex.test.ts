import { joinLines, strex } from "../src/strex";
import { test, expect } from "vitest";

test("text pattern", () => {
	const result = strex({
		text: joinLines([
			"hello world from the moon",
			"hello world from the stars",
		]),
		patternString: "hello world",
		variables: [],
	});

	expect(result.matches.length).toEqual(2);

	expect(result.matches[0].text).toEqual("hello world");
	expect(result.matches[0].variables).toEqual({});

	expect(result.matches[1].text).toEqual("hello world");
	expect(result.matches[1].variables).toEqual({});
});

test("multiple variables in a single line", () => {
	const result = strex({
		text: joinLines([
			"I have one apple here",
			"I do not have any tomatoes",
			"I have two oranges here",
			"I have three bananas here",
		]),
		patternString: "I have @{{ number }} @{{ fruit }} here",
		variables: ["number", "fruit"],
	});

	expect(result.matches.length).toEqual(3);

	expect(result.matches[0].text).toEqual("I have one apple here");
	expect(result.matches[0].variables).toEqual({
		number: "one",
		fruit: "apple",
	});

	expect(result.matches[1].text).toEqual("I have two oranges here");
	expect(result.matches[1].variables).toEqual({
		number: "two",
		fruit: "oranges",
	});

	expect(result.matches[2].text).toEqual("I have three bananas here");
	expect(result.matches[2].variables).toEqual({
		number: "three",
		fruit: "bananas",
	});
});

test("multiline pattern", () => {
	const result = strex({
		text: joinLines([
			'import { a, b, c } from "letters";',
			'import { apple, orange, banaan } from "fruits";',
			'import {\n\tapple,\n\torange,\n\tbanana\n} from "fruits";',
		]),
		patternString: `import {@{{ imports }}} from "@{{ from }}";`,
		variables: ["imports", "from"],
	});

	expect(result.matches.length).toEqual(3);

	expect(result.matches[0].variables).toEqual({
		imports: " a, b, c ",
		from: "letters",
	});
	expect(result.matches[0].text).toEqual('import { a, b, c } from "letters";');
});

test.skip("tab identation", () => {
	// TODO
});

test.skip("space identation", () => {
	// TODO
});

test.skip("matches start of line", () => {
	// TODO
});

test.skip("matches end of line", () => {
	// TODO
});

test.skip("matches start and end of line", () => {
	// TODO
});

test.skip("matches start and end of line with tab identation", () => {
	// TODO
});

test.skip("matches start and end of line with space identation", () => {
	// TODO
});
