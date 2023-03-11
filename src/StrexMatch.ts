import { joinLines } from "./line-utils/join-lines";
import { StrexPartMatch } from "./types/strex-part-match";
import { isVariablePartMatch } from "./utils/is-variable-part-match";
import { sliceLines } from "./line-utils/slice-lines";

export class StrexMatch<TVar extends string> {
  readonly lines: string[];
  readonly partMatches: StrexPartMatch<TVar>[];
  readonly offsetLineIndex: number;
  readonly offsetColumnIndex: number;

  constructor(data: {
    lines: string[];
    partMatches: StrexPartMatch<TVar>[];
    offsetLineIndex: number;
    offsetColumnIndex: number;
  }) {
    this.partMatches = data.partMatches;
    this.offsetLineIndex = data.offsetLineIndex;
    this.offsetColumnIndex = data.offsetColumnIndex;
  }

  get variables(): Record<TVar, string> {
    return this.partMatches
      .filter(isVariablePartMatch)
      .reduce(
        (acc, part) => ({ ...acc, [part.name as TVar]: part.value }),
        {}
      ) as Record<TVar, string>;
  }

  get startLineIndex(): number {
    const firstPartMatch = this.partMatches[0];

    const startLineIndex =
      firstPartMatch.type === "text"
        ? firstPartMatch.lineIndex
        : firstPartMatch.startLineIndex;

    return this.offsetLineIndex + startLineIndex;
  }

  get endLineIndex(): number {
    const lastPartMatch = this.partMatches[this.partMatches.length - 1];

    const endLineIndex =
      lastPartMatch.type === "text"
        ? lastPartMatch.lineIndex
        : lastPartMatch.endLineIndex;

    return this.offsetLineIndex + endLineIndex;
  }

  get endColumnIndex(): number {
    const lastPartMatch = this.partMatches[this.partMatches.length - 1];

    if (this.startLineIndex === this.endLineIndex) {
      return this.offsetColumnIndex + lastPartMatch.endColumnIndex;
    }

    return lastPartMatch.endColumnIndex;
  }

  get text(): string {
    return joinLines(this.matchedLines);
  }

  get matchedLines(): string[] {
    return sliceLines({
      lines: this.lines,
      startLineIndex: 0,
      startColumnIndex: 0,
      endLineIndex: this.endLineIndex,
      endColumnIndex: this.endColumnIndex,
    });
  }
}
