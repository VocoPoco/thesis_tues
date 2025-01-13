import { RootContent } from 'mdast';
import Processor from './Processor.js';

class InlineCodeProcessor extends Processor {
  public constructProperties(node: RootContent): Record<string, string> {
    return {
      value: 'value' in node ? node.value || '' : '',
    };
  }
}

export default InlineCodeProcessor;
