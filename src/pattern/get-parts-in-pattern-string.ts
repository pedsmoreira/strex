import { StrexPart } from "../types/strex-part";

const PATTERN_START = "@{{";
const PATTERN_END = "}}";

type Args<TVar extends string> = {
	patternString: string;
	variables: TVar[];
};

export function getPartsInPatternString<TVar extends string,>({
	patternString,
	variables,
}: Args<TVar>): StrexPart<TVar>[] {
	let remaining = patternString.replace(/\n/g, "");

	const parts: StrexPart<TVar>[] = [];

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
			.trim() as TVar;

		parts.push({ type: "variable", name });

		remaining = remaining.substring(matchEnd + PATTERN_END.length);
		if (!remaining) break;
	}

	// Check that the variable names are correct
	const remainingVariables = new Set([...variables]);
	parts.forEach((part) => {
		if (part.type === "variable") remainingVariables.delete(part.name);
	});

	if (remainingVariables.size > 0)
		throw new Error(
			`Invalid variables provided. Expected ${variables.join(
				", ",
			)}; Not found: ${remainingVariables.values}`,
		);

	return parts;
}
