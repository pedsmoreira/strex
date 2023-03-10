import { StrexPartMatch } from "./strex-part-match";

export interface StrexMatch<TVar extends string> {
  readonly text: string;
  readonly startLineIndex: number;
  readonly startColumnIndex: number;
  readonly endLineIndex: number;
  readonly endColumnIndex: number;
  readonly matchParts: StrexPartMatch<TVar>[];
  readonly variables: Record<TVar, string>;
}
