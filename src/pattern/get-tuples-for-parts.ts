import {
  StrexPatternPart,
  StrexPatternVariablePart,
} from "../types/strex-pattern-part";
import { StrexPatternPartTuple } from "../types/strex-pattern-part-tuple";

export function getTuplesForParts<TVar extends string>(
  patternParts: StrexPatternPart<TVar>[],
): StrexPatternPartTuple<TVar>[] {
  const tuples: StrexPatternPartTuple<TVar>[] = [];

  let patternVariablePart: StrexPatternVariablePart<TVar> | undefined =
    undefined;

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
