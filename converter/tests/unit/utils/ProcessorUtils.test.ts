import ProcessorUtils from '@src/utils/ProcessorUtils';

describe('resolveReferences', () => {
  it('should correctly resolve references and update templates with URLs', () => {
    const lineMap = new Map([
      ['link1', 5],
      ['image1', 10],
    ]);
    const definitions = new Map([
      ['link1', 'https://example.com'],
      ['image1', 'https://example.com/image.png'],
    ]);
    const templateMap = new Map<number, string[]>([
      [5, ['<Link text="Example Link" href="{url}" />']],
      [10, ['<Image src="{url}" alt="Example Image" />']],
    ]);

    ProcessorUtils.resolveReferences(lineMap, definitions, templateMap);

    expect(templateMap.get(5)).toEqual([
      '<Link text="Example Link" href="https://example.com" />',
    ]);
    expect(templateMap.get(10)).toEqual([
      '<Image src="https://example.com/image.png" alt="Example Image" />',
    ]);
  });

  it('should handle missing references gracefully', () => {
    const lineMap = new Map([['link1', 5]]);
    const definitions = new Map([['image1', 'https://example.com/image.png']]);
    const templateMap = new Map<number, string[]>([
      [5, ['<Link text="Example Link" href="{url}" />']],
    ]);

    ProcessorUtils.resolveReferences(lineMap, definitions, templateMap);

    expect(templateMap.get(5)).toEqual([
      '<Link text="Example Link" href="{url}" />',
    ]); // No replacement
  });
});
