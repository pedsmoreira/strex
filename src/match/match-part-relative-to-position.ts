import { StrexPartMatch } from "../types/strex-part-match";

type Args<TVar extends string> = {
	matchPart: StrexPartMatch<TVar>;
	lineIndex: number;
	columnIndex: number;
};

export function matchPartRelativetoPosition<TVar extends string>({
	matchPart,
	lineIndex,
	columnIndex,
}: Args<TVar>): StrexPartMatch<TVar> {
	const matchPartStartLineIndex =
		matchPart.type === "text" ? matchPart.lineIndex : matchPart.startLineIndex;

	const matchPartEndLineIndex =
		matchPart.type === "text" ? matchPart.lineIndex : matchPart.endLineIndex;

	const matchPartLength =
		matchPart.type === "text" ? matchPart.text.length : matchPart.value.length;

	const startLineIndex = matchPartStartLineIndex - lineIndex;
	const endLineIndex = matchPartEndLineIndex - lineIndex;

	const startColumnIndex =
		startLineIndex === 0
			? matchPart.startColumnIndex - columnIndex
			: matchPart.startColumnIndex;

	const endColumnIndex =
		startLineIndex === endLineIndex
			? startColumnIndex + matchPartLength
			: matchPart.endColumnIndex;

	if (matchPart.type === "text") {
		return {
			type: "text",
			text: matchPart.text,
			lineIndex: startLineIndex,
			startColumnIndex,
			endColumnIndex,
		};
	}

	return {
		type: "variable",
		name: matchPart.name,
		value: matchPart.value,
		startLineIndex,
		startColumnIndex,
		endLineIndex,
		endColumnIndex,
	};
}
