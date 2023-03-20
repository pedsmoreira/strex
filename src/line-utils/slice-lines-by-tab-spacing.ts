const tabsOrSpacesRegex = /^\s+/;

export function sliceLinesByTabSpacing(lines: string[]): string[] {
	const firstLineMatch = lines[0].match(tabsOrSpacesRegex);

	// If the first line starts at index 0, matchText will be undefined
	const matchText = firstLineMatch?.[0];

	for (let lineIndex = 1; lineIndex < lines.length; lineIndex++) {
		const line = lines[lineIndex];

		const lineMatches = matchText
			? line.startsWith(matchText)
			: !line.match(tabsOrSpacesRegex);

		if (lineMatches) return lines.slice(0, lineIndex);
	}

	return lines;
}
