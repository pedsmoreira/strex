export type StrexTextPart = {
	readonly type: "text";
	readonly text: string;
};

export type StrexVariablePart<TVar extends string> = {
	readonly type: "variable";
	readonly name: TVar;
};

export type StrexPart<TVar extends string> =
	| StrexTextPart
	| StrexVariablePart<TVar>;
