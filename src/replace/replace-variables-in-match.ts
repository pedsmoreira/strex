import { StrexMatch } from "../StrexMatch";

type Args<TVar extends string> = {
	match: StrexMatch<TVar>;
	variables: Partial<Record<TVar, string>>;
};

export function replaceVariablesInMatch<TVar extends string>({
	match,
	variables,
}: Args<TVar>): string {
	const mappedParts = match.partMatches.map((part) => {
		if (part.type === "text") return part.text;

		if (part.type === "variable") {
			const replacement = variables[part.name as TVar];
			return typeof replacement === "undefined" ? part.value : replacement;
		}
	});

	return mappedParts.join("");
}
