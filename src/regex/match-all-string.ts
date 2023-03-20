import { S } from "vitest/dist/types-7cd96283";
import { escapeRegexString } from "./escape-regex-string";

type Args = {
	haystack: string;
	needle: string;
};

type MatchAllResult = {
	startIndex: number;
	text: string;
};

export function matchAllString({ haystack, needle }: Args): MatchAllResult[] {
	const results: MatchAllResult[] = [];

	const matches = haystack.matchAll(new RegExp(escapeRegexString(needle), "g"));

	for (const match of matches) {
		results.push({ startIndex: match.index, text: match[0] });
	}

	return results;
}
