import { sliceLinesByEnclosing } from "./slice-lines-by-enclosing";
import { sliceLinesByTabSpacing } from "./slice-lines-by-tab-spacing";
import { StrexMatchEndOn } from "../types/strex-match-end-on";

type Args = {
	lines: string[];
	endOn: StrexMatchEndOn;
};

export function linesForEndOn({ lines, endOn }: Args): string[] {
	switch (endOn.type) {
		case "pattern":
			return lines;
		case "single-line":
			return [lines[0]];
		case "enclosing":
			return sliceLinesByEnclosing({
				lines,
				open: endOn.open,
				close: endOn.close,
			}).lines;
		case "tab-spacing":
			return sliceLinesByTabSpacing(lines);
	}
}
