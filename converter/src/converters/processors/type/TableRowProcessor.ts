import { Parent, RootContent } from 'mdast';
import ProcessorFactory from './../../ASTProcessorFactory.js';
import Processor from './Processor.js';

class TableRowProcessor extends Processor {
  protected constructProperties(node: RootContent): Record<string, string> {
    return {};
  }

  private processNodeChildren(
    node: Parent,
    processFn: (processor: Processor, childNode: RootContent) => string,
  ): string {
    return node.children
      .map((child) => {
        const childNode = (child as Parent).children[0];
        const childNodeType = childNode.type;
        const processor = ProcessorFactory.getProcessor(childNodeType);
        if (processor) {
          return processFn(processor, childNode);
        }
      })
      .join('');
  }

  public processHeaderCells(node: Parent): string {
    return this.processNodeChildren(node, (processor, childNode) => {
      return this.createColumn(processor, childNode);
    });
  }

  public processDataCells(node: Parent): string {
    const cells = this.processNodeChildren(node, (processor, childNode) => {
      return processor.processPlaceholders(childNode);
    });

    return this.createListItem(cells);
  }

  private createColumn(processor: Processor, child: RootContent): string {
    return `<Column><header>${processor.processPlaceholders(child)}</header></Column>`;
  }

  private createListItem(cells: string) {
    return `<ColumnListItem><cells>${cells}</cells></ColumnListItem>`;
  }
}

export default TableRowProcessor;
