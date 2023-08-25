import { StrexTextPart, StrexVariablePart } from "./strex-part";

export type StrexPartTuple<TVar extends string> = [
	StrexVariablePart<TVar> | undefined,
	StrexTextPart | undefined,
];
