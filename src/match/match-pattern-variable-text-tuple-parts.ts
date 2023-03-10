import { joinLines } from "../line-utils/join-lines";
import {
  StrexMatchPart,
  StrexMatchTextPart,
  StrexMatchVariablePart,
  StrexPatternVariableTextPartTuple,
} from "../types";

type Args = {
  lines: string[];
  tuple: StrexPatternVariableTextPartTuple;
  mustMatchAtLineStart: boolean;
  mustMatchAtLineEnd: boolean;
};

export function matchPatternVariableTextTupleParts<T extends string>({
  lines,
  tuple,
  mustMatchAtLineStart,
  mustMatchAtLineEnd,
}: Args): StrexMatchPart<T>[] | undefined {
  const [patternVariablePart, patternTextPart] = tuple;

  /*
   * Variable only part
   */

  if (!patternTextPart) {
    if (!patternVariablePart) {
      throw new Error("Attempting to match tuple without text and variable");
    }

    const lastLine = lines[lines.length - 1];

    const matchVariablePart: StrexMatchVariablePart<T> = {
      type: "variable",
      name: patternVariablePart.name,
      value: joinLines(lines),
      startLineIndex: 0,
      startColumnIndex: 0,
      endLineIndex: lines.length - 1,
      endColumnIndex: lastLine.length - 1,
    };

    return [matchVariablePart];
  }

  /*
   * Tuple has text
   */

  const matchTextLineIndex = lines.findIndex((line) => {
    const index = line.indexOf(patternTextPart.text);

    if (index === -1) return false;

    if (mustMatchAtLineStart && !patternVariablePart && index !== 0) {
      return false;
    }

    if (mustMatchAtLineEnd && index !== line.length - 1) return false;

    return true;
  });

  if (matchTextLineIndex > 0 && !patternVariablePart) return undefined;
  if (matchTextLineIndex === -1) return undefined;

  const matchTextLine = lines[matchTextLineIndex];
  const textStartIndex = matchTextLine.indexOf(patternTextPart.text);
  const textEndIndex = textStartIndex + patternTextPart.text.length;
  const matchText = matchTextLine.substring(textStartIndex, textEndIndex);

  const matchTextPart: StrexMatchTextPart = {
    type: "text",
    text: matchText,
    lineIndex: matchTextLineIndex,
    startColumnIndex: textStartIndex,
    endColumnIndex: textEndIndex,
  };

  if (!patternVariablePart) return [matchTextPart];

  /*
   * Tuple has both text and variable
   */

  const variableLines = lines.splice(0, matchTextLineIndex + 1);
  const initialVariableLines = variableLines.slice(0, variableLines.length - 1);
  const lastVariableLine =
    textEndIndex > 0 && variableLines.length > 0
      ? variableLines[variableLines.length - 1]
      : undefined;

  const slicedVariableLines = [
    ...initialVariableLines,
    lastVariableLine?.substring(0, textStartIndex),
  ].filter((line) => line !== undefined) as string[];

  const lastSlicedVariableLine =
    slicedVariableLines[slicedVariableLines.length - 1] || "";

  const matchVariablePart: StrexMatchVariablePart<T> = {
    type: "variable",
    name: patternVariablePart.name,
    value: joinLines(slicedVariableLines),
    startLineIndex: 0,
    startColumnIndex: 0,
    endLineIndex: slicedVariableLines.length - 1,
    endColumnIndex: lastSlicedVariableLine.length,
  };

  return [matchVariablePart, matchTextPart];
}
