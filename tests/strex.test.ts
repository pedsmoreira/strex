import { joinLines, splitByLine, strex } from "../dist/strex";
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
			'import { apple, orange, banana } from "fruits";',
			'import {\n\thammer,\n\tpliers\n} from "tools";',
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

	expect(result.matches[1].variables).toEqual({
		imports: " apple, orange, banana ",
		from: "fruits",
	});
	expect(result.matches[1].text).toEqual(
		'import { apple, orange, banana } from "fruits";',
	);

	expect(result.matches[2].variables).toEqual({
		imports: "\n\thammer,\n\tpliers\n",
		from: "tools",
	});
	expect(result.matches[2].text).toEqual(
		'import {\n\thammer,\n\tpliers\n} from "tools";',
	);
});

test("matches start of line", () => {
	const result = strex({
		text: joinLines(["hello one!", "// hello two!", "hello three! yes"]),
		patternString: "hello @{{ what }}!",
		variables: ["what"],
		options: { mustMatchAtLineStart: true },
	});

	expect(result.matches.length).toEqual(2);
	expect(result.matches[0].text).toEqual("hello one!");
	expect(result.matches[1].text).toEqual("hello three!");
});

test("matches end of line", () => {
	const result = strex({
		text: joinLines(["hello one!", "// hello two!", "hello three! yes"]),
		patternString: "hello @{{ what }}!",
		variables: ["what"],
		options: { mustMatchAtLineEnd: true },
	});

	expect(result.matches.length).toEqual(2);
	expect(result.matches[0].text).toEqual("hello one!");
	expect(result.matches[1].text).toEqual("hello two!");
});

test("matches start and end of line", () => {
	const result = strex({
		text: joinLines(["hello one!", "// hello two!", "hello three! yes"]),
		patternString: "hello @{{ what }}!",
		variables: ["what"],
		options: { mustMatchAtLineStart: true, mustMatchAtLineEnd: true },
	});

	expect(result.matches.length).toEqual(1);
	expect(result.matches[0].text).toEqual("hello one!");
});

test("StrexResult#replaceMatches", () => {
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

	const replacedText = result.replaceMatches((match) =>
		match.replaceVariables({
			number: `(${match.variables.number})`,
			fruit: `[${match.variables.fruit}]`,
		}),
	);

	const replacedLines = splitByLine(replacedText);

	expect(replacedLines).toHaveLength(4);

	expect(replacedLines[0]).toEqual("I have (one) [apple] here");
	expect(replacedLines[1]).toEqual("I do not have any tomatoes");
	expect(replacedLines[2]).toEqual("I have (two) [oranges] here");
	expect(replacedLines[3]).toEqual("I have (three) [bananas] here");
});
