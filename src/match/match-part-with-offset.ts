import { StrexPartMatch } from "../types/strex-part-match";

type Args<TVar extends string> = {
  matchPart: StrexPartMatch<TVar>;
  offsetLineIndex: number;
  offsetColumnIndex: number;
};

export function matchPartWithOffset<TVar extends string>({
  matchPart,
  offsetLineIndex,
  offsetColumnIndex,
}: Args<TVar>): StrexPartMatch<TVar> {
  const matchPartStartLineIndex =
    matchPart.type === "text" ? matchPart.lineIndex : matchPart.startLineIndex;

  const matchPartEndLineIndex =
    matchPart.type === "text" ? matchPart.lineIndex : matchPart.endLineIndex;

  const matchPartLength =
    matchPart.type === "text" ? matchPart.text.length : matchPart.value.length;

  const startLineIndex = matchPartStartLineIndex + offsetLineIndex;
  const endLineIndex = matchPartEndLineIndex + offsetLineIndex;

  const startColumnIndex =
    matchPartStartLineIndex === 0
      ? offsetColumnIndex + matchPart.startColumnIndex
      : matchPart.startColumnIndex;

  const endColumnIndex =
    startLineIndex === endLineIndex
      ? startColumnIndex + matchPartLength
      : matchPart.endColumnIndex;

  if (matchPart.type === "text") {
    return {
      type: "text",
      text: matchPart.text,
      lineIndex: startLineIndex,
      startColumnIndex,
      endColumnIndex,
    };
  }

  return {
    type: "variable",
    name: matchPart.name,
    value: matchPart.value,
    startLineIndex,
    startColumnIndex,
    endLineIndex,
    endColumnIndex,
  };
}
