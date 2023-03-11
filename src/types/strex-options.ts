import { StrexMatchEndOn } from "./strex-match-end-on";

export type StrexOptions = {
  endOn?: StrexMatchEndOn;
  mustMatchAtLineStart?: boolean;
  mustMatchAtLineEnd?: boolean;
};
