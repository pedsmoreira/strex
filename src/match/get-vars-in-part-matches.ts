import { StrexPartMatch } from "../types/strex-part-match";

export function getVarsInPartMatches<T extends string>(
  partMatches: StrexPartMatch<T>[]
): Record<T, string> {
  return partMatches.reduce((acc, part) => {
    if (part.type === "text") return acc;
    return { ...acc, [part.name as T]: part.value };
  }, {}) as Record<T, string>;
}
