export type StrexPatternTextPart = {
	readonly type: "text";
	readonly text: string;
};

export type StrexPatternVariablePart<TVar extends string> = {
	readonly type: "variable";
	readonly name: TVar;
};

export type StrexPatternPart<TVar extends string> =
	| StrexPatternTextPart
	| StrexPatternVariablePart<TVar>;
