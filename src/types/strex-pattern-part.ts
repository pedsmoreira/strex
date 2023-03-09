export type StrexPatternTextPart = {
  readonly type: 'text';
  readonly text: string;
};

export type StrexPatternVariablePart = {
  readonly type: 'variable';
  readonly name: string;
};

export type StrexPatternPart = StrexPatternTextPart | StrexPatternVariablePart;
