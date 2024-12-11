import { Literal, RootContent } from 'mdast';
import Processor from './Processor';

class TextProcessor extends Processor {
  public constructProperties(node: RootContent): Record<string, string> {
    return {
      value: 'value' in node ? (node as Literal).value || '' : '',
    };
  }
}

export default TextProcessor;
