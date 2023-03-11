import { StrexPart, StrexVariablePart } from "../types/strex-part";
import { StrexPartTuple } from "../types/strex-part-tuple";

export function getTuplesForParts(patternParts: StrexPart[]): StrexPartTuple[] {
	const tuples: StrexPartTuple[] = [];

	let patternVariablePart: StrexVariablePart | undefined = undefined;

	for (let i = 0; i < patternParts.length; i++) {
		const part = patternParts[i];

		if (part.type === "variable") {
			patternVariablePart = part;
		} else {
			tuples.push([patternVariablePart, part]);
			patternVariablePart = undefined;
		}
	}

	if (patternVariablePart) {
		tuples.push([patternVariablePart, undefined]);
	}

	return tuples;
}
