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
      // TODO: implement
      throw new Error("enclosing is not implemented yet");
    case "tab-spacing":
      // TODO: implement
      throw new Error("tab-spacing is not implemented yet");
  }
}
