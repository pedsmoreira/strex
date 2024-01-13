export function escapeRegexString(regexString: string) {
  // Reference: https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
  return regexString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
