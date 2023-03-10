import { StrexTextPart, StrexVariablePart } from "./strex-part";

export type StrexPartTuple = [
  StrexVariablePart | undefined,
  StrexTextPart | undefined
];
