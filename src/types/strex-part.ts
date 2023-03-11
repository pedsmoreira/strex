export type StrexTextPart = {
	readonly type: "text";
	readonly text: string;
};

export type StrexVariablePart = {
	readonly type: "variable";
	readonly name: string;
};

export type StrexPart = StrexTextPart | StrexVariablePart;
