import { matchText } from "./match-text";
import { describe, it, expect } from "vitest";

describe("matchText", () => {
  it("matches case #1", () => {
    expect(
      matchText({
        needle: ` from '`,
        haystack: `import React from 'react';`,
        mustMatchAtLineStart: false,
        mustMatchAtLineEnd: false,
      })
    ).toEqual({
      startColumnIndex: 12,
      endColumnIndex: 19,
    });
  });

  it("matches case #2", () => {
    expect(
      matchText({
        needle: `import `,
        haystack: `import React from 'react';`,
        mustMatchAtLineStart: false,
        mustMatchAtLineEnd: false,
      })
    ).toEqual({
      startColumnIndex: 0,
      endColumnIndex: 7,
    });
  });

  it("matches case #3", () => {
    expect(
      matchText({
        needle: ` from '`,
        haystack: `import React from 'react';`,
        mustMatchAtLineStart: true,
        mustMatchAtLineEnd: false,
      })
    ).toBeUndefined();
  });

  it("matches case #4", () => {
    expect(
      matchText({
        needle: `import `,
        haystack: `import React from 'react';`,
        mustMatchAtLineStart: true,
        mustMatchAtLineEnd: false,
      })
    ).toEqual({
      startColumnIndex: 0,
      endColumnIndex: 7,
    });
  });

  it("matches case #5", () => {
    expect(
      matchText({
        needle: `';`,
        haystack: `import React from 'react';`,
        mustMatchAtLineStart: false,
        mustMatchAtLineEnd: true,
      })
    ).toEqual({
      startColumnIndex: 24,
      endColumnIndex: 26,
    });
  });
});
