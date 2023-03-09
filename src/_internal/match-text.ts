type Args = {
  haystack: string;
  needle: string;
  mustMatchAtLineStart: boolean;
  mustMatchAtLineEnd: boolean;
};

export function matchText({
  haystack,
  needle,
  mustMatchAtLineStart,
  mustMatchAtLineEnd,
}: Args):
  | {
      startColumnIndex: number;
      endColumnIndex: number;
    }
  | undefined {
  const startColumnIndex = haystack.indexOf(needle);
  const endColumnIndex = startColumnIndex + needle.length;

  if (startColumnIndex === -1) return;
  if (mustMatchAtLineStart && startColumnIndex !== 0) return;
  if (mustMatchAtLineEnd && endColumnIndex !== haystack.length) return;

  return { startColumnIndex, endColumnIndex };
}
