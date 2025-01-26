import { RootContent } from 'mdast';
import ReferenceProcessor from './ReferenceProcessor.js';

class LinkReferenceProcessor extends ReferenceProcessor {
  protected extractAdditionalProperties(
    node: RootContent,
  ): Record<string, string> {
    const value =
      'children' in node &&
      node.children.length > 0 &&
      'value' in node.children[0]
        ? (node.children[0] as any).value
        : '';

    return { value };
  }
}

export default LinkReferenceProcessor;
