import { StrexMatch } from './strex-match';

export interface StrexResult<T extends string> {
  readonly contents: string;
  readonly matches: StrexMatch<T>[];
}
