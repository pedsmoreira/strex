import { StrexPatternPart } from "../types/strex-pattern-part";

type Args<TVar extends string> = {
	variables: TVar[];
	parts: StrexPatternPart<TVar>[];
};

export function assertPatternPartsVariablesValidity<TVar extends string>({
	variables,
	parts,
}: Args<TVar>) {
	const remainingVariables = new Set([...variables]);

	const missingVariable = parts.some((part) => {
		if (part.type !== "variable") return;

		if (!remainingVariables.has(part.name)) return true;
		remainingVariables.delete(part.name);
	});

	if (missingVariable || remainingVariables.size > 0) {
		throw new Error(
			`Invalid variables provided. Expected ${variables.join(
				", ",
			)}; Not found: ${Array.from(remainingVariables).join(",")}`,
		);
	}
}
