import { Parent, RootContent } from 'mdast';
import ProcessorFactory from '../ProcessorFactory.js';
import Processor from './Processor.js';

class ListProcessor extends Processor {
  public constructProperties(node: RootContent): Record<string, string> {
    return {
      value: this.processListItems(node as Parent),
    };
  }

  protected shouldEscape(node: RootContent): boolean {
    return false;
  }

  private processListItems(node: Parent): string {
    return node.children
      .map((child) => {
        if (child.type === 'listItem') {
          const processor = ProcessorFactory.getProcessor('listItem');
          return processor.processPlaceholders(child);
        }
        return '';
      })
      .join('\n');
  }
}

export default ListProcessor;
