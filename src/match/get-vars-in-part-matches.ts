import {
  StrexPartMatch,
  StrexVariablePartMatch,
} from "../types/strex-part-match";

function isVariablePartMatch<TVar extends string>(
  partMatch: StrexPartMatch<TVar>
): partMatch is StrexVariablePartMatch<TVar> {
  return partMatch.type === "variable";
}

export function getVarsInPartMatches<TVar extends string>(
  partMatches: StrexPartMatch<TVar>[]
): Record<TVar, string> {
  return partMatches
    .filter(isVariablePartMatch)
    .reduce(
      (acc, part) => ({ ...acc, [part.name as TVar]: part.value }),
      {}
    ) as Record<TVar, string>;
}
