import { StrexMatchPart } from "./strex-match-part";

export interface StrexMatch<TVariable extends string> {
  readonly text: string;
  readonly startLineIndex: number;
  readonly startColumnIndex: number;
  readonly endLineIndex: number;
  readonly endColumnIndex: number;
  readonly matchParts: StrexMatchPart<TVariable>[];
  readonly variables: Record<TVariable, string>;
}
