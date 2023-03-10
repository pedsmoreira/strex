import { StrexMatchPart } from "../types";

type Args<T extends string> = {
  matchParts: StrexMatchPart<T>[];
};

export function extractVariablesFromMatchParts<T extends string>({
  matchParts,
}: Args<T>): Record<T, string> {
  const variables: Partial<Record<T, string>> = {};

  matchParts.forEach((part) => {
    if (part.type === "text") return;
    variables[part.name as T] = part.value;
  });

  return variables as Record<T, string>;
}
