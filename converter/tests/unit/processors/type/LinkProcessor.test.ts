import LinkProcessor from '@src/converters/processors/type/LinkProcessor';

describe('LinkProcessor', () => {
  let processor: LinkProcessor;

  beforeEach(() => {
    processor = new LinkProcessor(
      '<Link text="{value}" href="{url}" tooltip="{title}"/>',
    );
  });

  it('should correctly process a link node with all properties', () => {
    const linkNode = {
      type: 'link',
      url: 'https://example.com',
      title: 'Example Link',
      children: [
        {
          type: 'text',
          value: 'Click here',
          position: {
            start: { line: 10, column: 5, offset: 105 },
            end: { line: 10, column: 15, offset: 115 },
          },
        },
      ],
      position: {
        start: { line: 10, column: 1, offset: 100 },
        end: { line: 10, column: 30, offset: 130 },
      },
    };

    const output = processor.processPlaceholders(linkNode as any);

    expect(output).toBe(
      '<Link text="Click here" href="https://example.com" tooltip="Example Link"/>',
    );
  });

  it('should correctly process a link node with missing optional properties', () => {
    const linkNode = {
      type: 'link',
      url: 'https://example.com',
      title: null,
      children: [
        {
          type: 'text',
          value: 'Go to site',
        },
      ],
      position: {
        start: { line: 11, column: 1, offset: 135 },
        end: { line: 11, column: 20, offset: 155 },
      },
    };

    const output = processor.processPlaceholders(linkNode as any);

    expect(output).toBe(
      '<Link text="Go to site" href="https://example.com" tooltip=""/>',
    );
  });
});
