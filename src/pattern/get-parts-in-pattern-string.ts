import { StrexPart } from "../types/strex-part";

const PATTERN_START = "@{{";
const PATTERN_END = "}}";

export function getPartsInPatternString(patternString: string): StrexPart[] {
	let remaining = patternString.replace(/\n/g, "");

	const parts: StrexPart[] = [];

	while (true) {
		const matchStart = remaining.indexOf(PATTERN_START);

		if (matchStart === -1) {
			parts.push({ type: "text", text: remaining });
			break;
		}

		const matchEnd = remaining.indexOf(PATTERN_END, matchStart);

		if (matchStart > 0) {
			parts.push({
				type: "text",
				text: remaining.substring(0, matchStart),
			});
		}

		const name = remaining
			.substring(matchStart + PATTERN_START.length, matchEnd)
			.trim();

		parts.push({ type: "variable", name });

		remaining = remaining.substring(matchEnd + PATTERN_END.length);
	}

	return parts;
}
