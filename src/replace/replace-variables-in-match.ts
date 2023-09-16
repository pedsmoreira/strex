import { StrexPartMatch } from "../types/strex-part-match";

type Args<TVar extends string> = {
	partMatches: StrexPartMatch<TVar>[];
	variables: Partial<Record<TVar, string>>;
};

export function replaceVariablesInPartMatches<TVar extends string>({
	partMatches,
	variables,
}: Args<TVar>): string {
	const mappedParts = partMatches.map((part) => {
		if (part.type === "text") return part.text;

		if (part.type === "variable") {
			const replacement = variables[part.name as TVar];
			return typeof replacement === "undefined" ? part.value : replacement;
		}
	});

	return mappedParts.join("");
}
