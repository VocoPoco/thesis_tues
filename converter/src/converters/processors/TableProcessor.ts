import { Parent, RootContent } from 'mdast';
import ProcessorFactory from '../ProcessorFactory.js';
import Processor from './Processor.js';
import TableRowProcessor from './TableRowProcessor.js';

class TableProcessor extends Processor {
  private columns: string[] = [];
  private items: string[] = [];

  public constructProperties(node: RootContent): Record<string, string> {
    this.processChildren(node as Parent);
    return {
      columns: this.columns.join(''),
      items: this.items.join(''),
    };
  }

  private processChildren(node: Parent): void {
    node.children.forEach((child, index) => {
      if (child.type === 'tableRow') {
        const rowProcessor = ProcessorFactory.getProcessor(
          'tableRow',
        ) as TableRowProcessor;
        if (index === 0) {
          this.columns.push(rowProcessor.processHeaderCells(child));
        } else {
          this.items.push(rowProcessor.processDataCells(child));
        }
      }
    });
  }
}

export default TableProcessor;
