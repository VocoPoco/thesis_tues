import { Parent, RootContent } from 'mdast';
import ListItemProcessor from './ListItemProcessor.js';
import Processor from './Processor.js';

class ListProcessor extends Processor {
  public constructProperties(node: RootContent): Record<string, string> {
    return {
      value: this.processListItems(node as Parent),
    };
  }

  private processListItems(node: Parent): string {
    return node.children
      .map((child) => {
        if (child.type === 'listItem') {
          const processor = new ListItemProcessor(
            '<CustomListItem>{value}</CustomListItem>',
          );
          return processor.processPlaceholders(child);
        }
        return '';
      })
      .join('\n');
  }
}

export default ListProcessor;
