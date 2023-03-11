import { StrexOptions } from "./types/strex-options";
import { StrexExp } from "./StrexExp";
import { StrexMatch } from "./StrexMatch";
import { StrexPartMatch } from "./StrexPartMatch";
import { StrexResult } from "./StrexResult";

export function strex<TVar extends string>({
  text,
  patternString,
  options,
}: {
  text: string;
  patternString: string;
  options?: StrexOptions;
}): StrexResult<TVar> {
  return new StrexExp(patternString, options).match(text);
}

export { StrexExp, StrexMatch, StrexPartMatch };
