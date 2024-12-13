import { Literal, Parent, RootContent } from 'mdast';
import Processor from './Processor.js';

class SpecialTextProcessor extends Processor {
  public constructProperties(node: RootContent): Record<string, string> {
    return {
      value:
        'children' in node && 'value' in (node as Parent).children[0]
          ? ((node as Parent).children[0] as Literal).value || ''
          : '',
    };
  }
}

export default SpecialTextProcessor;
