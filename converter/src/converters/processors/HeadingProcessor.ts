import { Literal, Parent, RootContent } from 'mdast';
import Processor from './Processor.js';

class HeadingProcessor extends Processor {
  public constructProperties(node: RootContent): Record<string, string> {
    return {
      depth: 'depth' in node ? node.depth.toString() || '' : '',
      value:
        'children' in node && 'value' in (node as Parent).children[0]
          ? ((node as Parent).children[0] as Literal).value || ''
          : '',
    };
  }
}

export default HeadingProcessor;
