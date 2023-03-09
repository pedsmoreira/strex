import {
  StrexPatternPart,
  StrexPatternVariablePart,
  StrexPatternVariableTextPartTuple,
} from "../types";

export function patternPartsToPatternVariableTextTuples(
  patternParts: StrexPatternPart[]
): StrexPatternVariableTextPartTuple[] {
  const tuples: StrexPatternVariableTextPartTuple[] = [];

  let patternVariablePart: StrexPatternVariablePart | undefined = undefined;

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
