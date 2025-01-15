import { Parent, RootContent } from 'mdast';
import ProcessorFactory from '../ProcessorFactory.js';
import Processor from './Processor.js';

class TableRowProcessor extends Processor {
  protected constructProperties(node: RootContent): Record<string, string> {
    return {};
  }

  public processHeaderCells(node: Parent): string {
    return node.children
      .map((child) => {
        const processor = ProcessorFactory.getProcessor(
          (child as Parent).children[0].type,
        );
        return processor ? this.createColumn(processor, child) : '';
      })
      .join('\n');
  }

  private createColumn(processor: Processor, child: RootContent): string {
    return `<Column>
                  <header>${processor.processPlaceholders((child as Parent).children[0])}</header>
              </Column>`;
  }

  public processDataCells(node: Parent): string {
    const cells = node.children
      .map((child) => {
        const processor = ProcessorFactory.getProcessor(
          (child as Parent).children[0].type,
        );
        return processor
          ? processor.processPlaceholders((child as Parent).children[0])
          : '';
      })
      .join('\n');

    return this.createListItem(cells);
  }

  private createListItem(cells: string) {
    return `<ColumnListItem>
                  <cells>
                      ${cells}
                  </cells>
              </ColumnListItem>`;
  }
}

export default TableRowProcessor;
