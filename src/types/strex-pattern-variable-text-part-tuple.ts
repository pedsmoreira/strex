import {
  StrexPatternTextPart,
  StrexPatternVariablePart,
} from './strex-pattern-part';

export type StrexPatternVariableTextPartTuple = [
  StrexPatternVariablePart | undefined,
  StrexPatternTextPart | undefined
];
