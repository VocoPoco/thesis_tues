import { Parent, RootContent } from 'mdast';
import ProcessorFactory from './../../ASTProcessorFactory.js';
import Processor from './Processor.js';

class ListItemProcessor extends Processor {
  public constructProperties(node: RootContent): Record<string, string> {
    return {
      value: this.processChildren(node as Parent),
    };
  }

  protected shouldEscape(): boolean {
    return false;
  }

  private processChildren(node: Parent): string {
    if (!node.children || node.children.length === 0) {
      return '<HBox></HBox>';
    }

    const firstChild = node.children[0] as Parent;
    if (!firstChild.children || firstChild.children.length === 0) {
      return '<HBox></HBox>';
    }

    const childrenContent = (node.children[0] as Parent).children
      .map((child) => {
        const processor = ProcessorFactory.getProcessor(child.type);
        return processor ? processor.processPlaceholders(child) : '';
      })
      .join('');
    return `<HBox>${childrenContent}</HBox>`;
  }
}

export default ListItemProcessor;
