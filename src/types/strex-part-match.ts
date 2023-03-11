export type StrexTextPartMatch = {
	type: "text";
	text: string;
	lineIndex: number;
	startColumnIndex: number;
	endColumnIndex: number;
};

export type StrexVariablePartMatch<T extends string> = {
	type: "variable";
	name: string;
	value: string;
	startLineIndex: number;
	endLineIndex: number;
	startColumnIndex: number;
	endColumnIndex: number;
};

export type StrexPartMatch<T extends string> =
	| StrexTextPartMatch
	| StrexVariablePartMatch<T>;
