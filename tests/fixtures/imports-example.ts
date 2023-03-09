import { StrexMatch, StrexPattern } from "../../dist/strex";

export const importsExampleContent = `
import oneReducer from '../redux/main/one';
import anotherReducer from '../redux/main/another';

export function doIt() {
  return (
    <div>The coolest</div> 
  );
} 
`;

export const importsExamplePatternString = `import @{{ imports }} from '@{{ path }}';`;

export const importsExamplePattern: StrexPattern = {
  patternParts: [
    { type: "text", text: "import " },
    { type: "variable", name: "imports" },
    { type: "text", text: " from '" },
    { type: "variable", name: "path" },
    { type: "text", text: "';" },
  ],
  endOn: { type: "pattern" },
  mustMatchAtLineStart: true,
  mustMatchAtLineEnd: false,
};

export const importsExampleMatches: StrexMatch<"imports" | "path">[] = [
  {
    text: "import oneReducer from '../redux/main/one';",
    matchParts: [
      {
        type: "text",
        text: "import ",
        lineIndex: 0,
        startColumnIndex: 0,
        endColumnIndex: 7,
      },
      {
        type: "variable",
        name: "imports",
        value: "oneReducer",
        startLineIndex: 0,
        startColumnIndex: 7,
        endLineIndex: 0,
        endColumnIndex: 17,
      },
      {
        type: "text",
        text: " from '",
        lineIndex: 0,
        startColumnIndex: 17,
        endColumnIndex: 24,
      },
      {
        type: "variable",
        name: "path",
        value: "../redux/main/one",
        startLineIndex: 0,
        startColumnIndex: 24,
        endLineIndex: 0,
        endColumnIndex: 41,
      },
      {
        type: "text",
        text: `';`,
        lineIndex: 0,
        startColumnIndex: 41,
        endColumnIndex: 43,
      },
    ],
    variables: { imports: "oneReducer", path: "../redux/main/one" },
    startLineIndex: 1,
    endLineIndex: 1,
    startColumnIndex: 0,
    endColumnIndex: 43,
  },
  {
    text: "import anotherReducer from '../redux/main/another';",
    matchParts: [
      {
        type: "text",
        text: "import ",
        lineIndex: 0,
        startColumnIndex: 0,
        endColumnIndex: 7,
      },
      {
        type: "variable",
        name: "imports",
        value: "anotherReducer",
        startLineIndex: 0,
        startColumnIndex: 7,
        endLineIndex: 0,
        endColumnIndex: 21,
      },
      {
        type: "text",
        text: " from '",
        lineIndex: 0,
        startColumnIndex: 21,
        endColumnIndex: 28,
      },
      {
        type: "variable",
        name: "path",
        value: "../redux/main/another",
        startLineIndex: 0,
        startColumnIndex: 28,
        endLineIndex: 0,
        endColumnIndex: 49,
      },
      {
        type: "text",
        text: `';`,
        lineIndex: 0,
        startColumnIndex: 49,
        endColumnIndex: 51,
      },
    ],
    variables: {
      imports: "anotherReducer",
      path: "../redux/main/another",
    },
    startLineIndex: 2,
    startColumnIndex: 0,
    endLineIndex: 2,
    endColumnIndex: 51,
  },
];
