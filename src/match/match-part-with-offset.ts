import { StrexMatchPart } from "../types";

type Args<
  TVariable extends string,
  TMatchPart extends StrexMatchPart<TVariable>
> = {
  matchPart: TMatchPart;
  offsetStartLineIndex: number;
  offsetColumnIndex: number;
};

export function matchPartWithOffset<
  TVariable extends string,
  TMatchPart extends StrexMatchPart<TVariable>
>({
  matchPart,
  offsetStartLineIndex,
  offsetColumnIndex,
}: Args<TVariable, TMatchPart>): TMatchPart {
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
