export type StrexMatchEndOn =
  | { type: 'pattern' }
  | { type: 'enclosing'; open: string; close: string }
  | { type: 'tab-spacing' }
  | { type: 'single-line' };
