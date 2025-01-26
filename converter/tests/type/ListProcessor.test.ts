import ProcessorFactory from '../../src/converters/ASTProcessorFactory';
import ListItemProcessor from '../../src/converters/processors/type/ListItemProcessor';
import ListProcessor from '../../src/converters/processors/type/ListProcessor';

describe('ListProcessor', () => {
  let processor: ListProcessor;

  beforeEach(() => {
    jest.spyOn(ProcessorFactory, 'getProcessor').mockImplementation((type) => {
      if (type === 'listItem') {
        return new ListItemProcessor(
          '<CustomListItem>{value}</CustomListItem>',
        );
      }
      throw new Error(`Unsupported processor type: ${type}`);
    });

    processor = new ListProcessor('<List>{value}</List>');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should correctly process a list node with multiple list items', () => {
    const listNode = {
      type: 'list',
      children: [
        { type: 'listItem', children: [{ type: 'text', value: 'Item 1' }] },
        { type: 'listItem', children: [{ type: 'text', value: 'Item 2' }] },
        { type: 'listItem', children: [{ type: 'text', value: 'Item 3' }] },
      ],
    };

    const output = processor.processPlaceholders(listNode as any);

    expect(output).toBe(
      `<List>
      <CustomListItem>
        <HBox><Text text="Item 1"/></HBox>
      </CustomListItem>
      <CustomListItem>
        <HBox><Text text="Item 2"/></HBox>
      </CustomListItem>
      <CustomListItem>
        <HBox><Text text="Item 3"/></HBox>
      </CustomListItem>
    </List>`,
    );
  });

  it('should handle a list node with no list items', () => {
    const listNode = {
      type: 'list',
      children: [],
    };

    const output = processor.processPlaceholders(listNode as any);

    expect(output).toBe('<List></List>');
  });

  it('should handle a list node with invalid children', () => {
    const listNode = {
      type: 'list',
      children: [{ type: 'invalid', value: 'Invalid Node' }],
    };

    const output = processor.processPlaceholders(listNode as any);

    expect(output).toBe('<List></List>');
  });
});
