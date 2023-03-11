import { StrexMatch } from "./StrexMatch";

export class StrexResult<TVar extends string> {
	readonly matches: StrexMatch<TVar>[];

	constructor(matches: StrexMatch<TVar>[]) {
		this.matches = matches;
	}
}
