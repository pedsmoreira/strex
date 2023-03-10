import { StrexPatternPart } from "../types";

const PATTERN_START = "@{{";
const PATTERN_END = "}}";

export function patternPartsFromString(pattern: string): StrexPatternPart[] {
  let remainingPattern = pattern.replace(/\n/g, "");

  const parts: StrexPatternPart[] = [];
  while (true) {
    const matchStart = remainingPattern.indexOf(PATTERN_START);

    if (matchStart === -1) {
      parts.push({ type: "text", text: remainingPattern });
      break;
    }

    const matchEnd = remainingPattern.indexOf(PATTERN_END, matchStart);

    if (matchStart > 0) {
      parts.push({
        type: "text",
        text: remainingPattern.substring(0, matchStart),
      });
    }

    const name = remainingPattern
      .substring(matchStart + PATTERN_START.length, matchEnd)
      .trim();

    parts.push({ type: "variable", name });

    remainingPattern = remainingPattern.substring(
      matchEnd + PATTERN_END.length
    );
  }

  return parts;
}
