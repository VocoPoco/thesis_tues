import HeadingProcessor from '@src/converters/processors/type/HeadingProcessor';

describe('HeadingProcessor', () => {
  let processor: HeadingProcessor;

  beforeEach(() => {
    processor = new HeadingProcessor('<Title level="{depth}" text="{value}"/>');
  });

  it('should correctly process a heading node with depth=2', () => {
    const headingNode = {
      type: 'heading',
      depth: 2,
      children: [
        {
          type: 'text',
          value: 'h2 Heading',
        },
      ],
    };
    const output = processor.processPlaceholders(headingNode as any);

    expect(output).toBe('<Title level="H2" text="h2 Heading"/>');
  });
});
