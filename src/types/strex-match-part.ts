export type StrexMatchTextPart = {
  type: 'text';
  text: string;
  lineIndex: number;
  startColumnIndex: number;
  endColumnIndex: number;
};

export type StrexMatchVariablePart<T extends string> = {
  type: 'variable';
  name: string;
  value: string;
  startLineIndex: number;
  endLineIndex: number;
  startColumnIndex: number;
  endColumnIndex: number;
};

export type StrexMatchPart<T extends string> =
  | StrexMatchTextPart
  | StrexMatchVariablePart<T>;
