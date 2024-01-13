import { StrexPatternPart } from "../types/strex-pattern-part";
import { assertPatternPartsVariablesValidity } from "./assert-pattern-parts-variables-validity";

const PATTERN_START = "@{{";
const PATTERN_END = "}}";

type Args<TVar extends string> = {
  patternString: string;
  variables: TVar[];
};

export function getPartsInPatternString<TVar extends string>({
  patternString,
  variables,
}: Args<TVar>): StrexPatternPart<TVar>[] {
  let remaining = patternString.replace(/\n/g, "");

  const parts: StrexPatternPart<TVar>[] = [];

  while (true) {
    const matchStart = remaining.indexOf(PATTERN_START);

    if (matchStart === -1) {
      parts.push({ type: "text", text: remaining });
      break;
    }

    const matchEnd = remaining.indexOf(PATTERN_END, matchStart);

    if (matchStart > 0) {
      parts.push({
        type: "text",
        text: remaining.substring(0, matchStart),
      });
    }

    const name = remaining
      .substring(matchStart + PATTERN_START.length, matchEnd)
      .trim() as TVar;

    parts.push({ type: "variable", name });

    remaining = remaining.substring(matchEnd + PATTERN_END.length);
    if (!remaining) break;
  }

  assertPatternPartsVariablesValidity({ variables, parts });

  return parts;
}
