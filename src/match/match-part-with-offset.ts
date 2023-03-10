import { StrexPartMatch } from "../types/strex-part-match";

type Args<TVar extends string, TPartMatch extends StrexPartMatch<TVar>> = {
  matchPart: TPartMatch;
  offsetStartLineIndex: number;
  offsetColumnIndex: number;
};

export function matchPartWithOffset<
  TVar extends string,
  TPartMatch extends StrexPartMatch<TVar>
>({
  matchPart,
  offsetStartLineIndex,
  offsetColumnIndex,
}: Args<TVar, TPartMatch>): TPartMatch {
  const matchPartStartLineIndex =
    matchPart.type === "text" ? matchPart.lineIndex : matchPart.startLineIndex;

  const matchPartEndLineIndex =
    matchPart.type === "text" ? matchPart.lineIndex : matchPart.endLineIndex;

  const startLineIndex = offsetStartLineIndex + matchPartStartLineIndex;
  const endLineIndex = startLineIndex + matchPartEndLineIndex;

  const startColumnIndex = matchPart.startColumnIndex + offsetColumnIndex;
  const endColumnIndex =
    startLineIndex === endLineIndex
      ? startColumnIndex +
        (matchPart.endColumnIndex - matchPart.startColumnIndex)
      : matchPart.endColumnIndex;

  if (matchPart.type === "text") {
    return {
      ...matchPart,
      lineIndex: startLineIndex,
      startColumnIndex,
      endColumnIndex,
    };
  }

  return {
    ...matchPart,
    startLineIndex,
    startColumnIndex,
    endLineIndex,
    endColumnIndex,
  };
}
