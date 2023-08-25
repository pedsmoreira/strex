import { StrexMatch } from "../StrexMatch";
import { StrexPartMatch } from "../types/strex-part-match";
import { matchPartRelativetoPosition } from "./match-part-relative-to-position";

type Args<TVar extends string> = {
	lines: string[];
	parts: StrexPartMatch<TVar>[];
	offsetLineIndex: number;
	offsetColumnIndex: number;
};

export function createMatchFromParts<TVar extends string>({
	lines,
	parts,
	offsetLineIndex,
	offsetColumnIndex,
}: Args<TVar>): StrexMatch<TVar> {
	const firstPart = parts[0];
	const startLineIndex =
		firstPart.type === "text" ? firstPart.lineIndex : firstPart.startLineIndex;
	const startColumnIndex = firstPart.startColumnIndex;

	const offsetParts = parts.map((matchPart) =>
		matchPartRelativetoPosition({
			matchPart,
			lineIndex: startLineIndex,
			columnIndex: startColumnIndex,
		}),
	);

	return new StrexMatch({
		lines,
		partMatches: offsetParts,
		offsetLineIndex: startLineIndex + offsetLineIndex,
		offsetColumnIndex:
			startLineIndex === 0
				? startColumnIndex + offsetColumnIndex
				: startColumnIndex,
	});
}
