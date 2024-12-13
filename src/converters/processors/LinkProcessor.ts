import { Literal, Parent, RootContent } from 'mdast';
import Processor from './Processor.js';

class LinkProcessor extends Processor {
  public constructProperties(node: RootContent): Record<string, string> {
    return {
      url: 'url' in node ? node.url || '' : '',
      value:
        'children' in node && 'value' in (node as Parent).children[0]
          ? ((node as Parent).children[0] as Literal).value || ''
          : '',
    };
  }
}

export default LinkProcessor;
