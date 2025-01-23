function escapeSpecialCharacters(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function resolveReferences(
  lineMap: Map<string, number>,
  definitions: Map<string, string>,
  templateMap: Map<number, string[]>,
): void {
  definitions.forEach((url, identifier) => {
    const line = lineMap.get(identifier);

    if (line !== undefined) {
      const lineTemplates = templateMap.get(line);

      if (lineTemplates) {
        const updatedTemplates = lineTemplates.map((template) => {
          if (template.includes('<Link')) {
            return template.replace('{url}', url);
          }
          return template;
        });

        templateMap.set(line, updatedTemplates);
      }
    }
  });
}
export default { escapeSpecialCharacters, resolveReferences };
