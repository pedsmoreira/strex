type Args = {
  lines: string[];
  startLineIndex: number;
  startColumnIndex: number;
  endLineIndex: number;
  endColumnIndex: number;
};

export function sliceLines({
  lines,
  startLineIndex,
  startColumnIndex,
  endLineIndex,
  endColumnIndex,
}: Args): string[] {
  let linesIncluded = lines.slice(startLineIndex, endLineIndex + 1);

  linesIncluded[linesIncluded.length - 1] = linesIncluded[
    linesIncluded.length - 1
  ].substring(0, endColumnIndex);

  linesIncluded[0] = linesIncluded[0].substring(startColumnIndex);

  return linesIncluded;
}
