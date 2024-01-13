import {
  StrexPatternTextPart,
  StrexPatternVariablePart,
} from "./strex-pattern-part";

export type StrexPatternPartTuple<TVar extends string> = [
  StrexPatternVariablePart<TVar> | undefined,
  StrexPatternTextPart | undefined,
];
