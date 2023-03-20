import { StrexMatch } from "../StrexMatch";

type Args<T extends string> = {
	match: StrexMatch<T>;
	variables: Partial<Record<T, string>>;
};

export function replaceVariablesInMatch<T extends string>({
	match,
	variables,
}: Args<T>): string {
	const mappedParts = match.partMatches.map((part) => {
		if (part.type === "text") return part.text;

		if (part.type === "variable") {
			const replacement = variables[part.name as T];
			return replacement === undefined ? part.value : replacement;
		}
	});

	return mappedParts.join("");
}
