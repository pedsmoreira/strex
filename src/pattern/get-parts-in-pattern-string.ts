import { StrexPart } from "../types/strex-part";

const PATTERN_START = "@{{";
const PATTERN_END = "}}";

function assertNameInVariables<TVar extends string>(
	name: string,
	variables: TVar[],
): TVar {
	const isValid = (variables as string[]).includes(name);

	if (!isValid)
		throw new Error(
			`${name} is not listed as a variable: [${variables.join(",")}]`,
		);

	return name as TVar;
}

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

		const name = assertNameInVariables(
			remaining.substring(matchStart + PATTERN_START.length, matchEnd).trim(),
			variables,
		);

		parts.push({ type: "variable", name });

		remaining = remaining.substring(matchEnd + PATTERN_END.length);
		if (!remaining) break;
	}

	return parts;
}
