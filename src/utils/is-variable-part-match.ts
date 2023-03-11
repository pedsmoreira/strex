import {
  StrexPartMatch,
  StrexVariablePartMatch,
} from "../types/strex-part-match";

export function isVariablePartMatch<TVar extends string>(
  partMatch: StrexPartMatch<TVar>
): partMatch is StrexVariablePartMatch<TVar> {
  return partMatch.type === "variable";
}
