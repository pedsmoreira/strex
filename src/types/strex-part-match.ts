export type StrexTextPartMatch = {
  type: "text";
  text: string;
  lineIndex: number;
  startColumnIndex: number;
  endColumnIndex: number;
};

export type StrexVariablePartMatch<TVar extends string> = {
  type: "variable";
  name: string;
  value: string;
  startLineIndex: number;
  endLineIndex: number;
  startColumnIndex: number;
  endColumnIndex: number;
};

export type StrexPartMatch<TVar extends string> =
  | StrexTextPartMatch
  | StrexVariablePartMatch<TVar>;
