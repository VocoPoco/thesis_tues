import ProcessorFactory from '../../src/converters/ASTProcessorFactory';
import ASTToSapui5XML from '../../src/converters/ASTToSapui5XML';
import ProcessorUtils from '../../src/utils/ProcessorUtils';

jest.mock('../../src/converters/ASTProcessorFactory');
jest.mock('../../src/converters/utils/ProcessorUtils');

describe('ASTToSapui5XML', () => {
  let converter: ASTToSapui5XML;

  beforeEach(() => {
    converter = new ASTToSapui5XML();
  });

  it('should correctly process and resolve references in a full AST', () => {
    const mockAST = {
      type: 'root',
      children: [
        {
          type: 'linkReference',
          identifier: 'link1',
          children: [{ type: 'text', value: 'Example Link' }],
          position: {
            start: { line: 5, column: 1 },
            end: { line: 5, column: 30 },
          },
        },
        {
          type: 'imageReference',
          identifier: 'image1',
          alt: 'Example Image',
          position: {
            start: { line: 10, column: 1 },
            end: { line: 10, column: 20 },
          },
        },
      ],
    };

    jest.spyOn(ProcessorFactory, 'getProcessor').mockImplementation((type) => {
      if (type === 'linkReference') {
        return new (require('../../src/converters/processors/type/LinkReferenceProcessor').default)(
          '<Link text="{value}" href="{url}" />',
        );
      }
      if (type === 'imageReference') {
        return new (require('../../src/converters/processors/type/ImageReferenceProcessor').default)(
          '<Image src="{url}" alt="{value}" />',
        );
      }
      return null;
    });

    jest
      .spyOn(ProcessorUtils, 'resolveReferences')
      .mockImplementation(() => {});

    const output = converter.convert(mockAST as any);

    expect(output).toContain('<mvc:View'); // Ensures the overall structure
    expect(ProcessorUtils.resolveReferences).toHaveBeenCalled();
  });
});
