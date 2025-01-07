import { Literal, RootContent } from 'mdast';
import Processor from './Processor.js';

class TextProcessor extends Processor {
  public constructProperties(node: RootContent): Record<string, string> {
    return {
      value: 'value' in node ? (node as Literal).value || '' : '',
    };
  }
}

export default TextProcessor;
