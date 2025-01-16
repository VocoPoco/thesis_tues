import { Literal, RootContent } from 'mdast';
import Processor from './Processor.js';

class LinkReferenceProcessor extends Processor {
  constructor(
    template: string,
    private definitions: Record<string, { url: string; title: string | null }>,
    private pendingReferences: Record<string, RootContent[]>,
  ) {
    super(template);
  }

  public processPlaceholders(node: RootContent): string {
    if (node.type !== 'linkReference') {
      return super.processPlaceholders(node);
    }

    const identifier = node.identifier || node.label || '';
    const definition = this.definitions[identifier];

    if (definition) {
      const properties = {
        ...this.constructProperties(node),
        url: definition.url,
        title: definition.title || '',
      };
      return Object.entries(properties).reduce(
        (result, [key, value]) => result.replace(`{${key}}`, value),
        this.template,
      );
    } else {
      if (!this.pendingReferences[identifier]) {
        this.pendingReferences[identifier] = [];
      }
      this.pendingReferences[identifier].push(node);
      return '';
    }
  }

  protected constructProperties(node: RootContent): Record<string, string> {
    const properties: Record<string, string> = {};
    if ('children' in node && Array.isArray(node.children)) {
      properties.value = node.children
        .map((child) =>
          'value' in child ? (child as Literal).value || '' : '',
        )
        .join('');
    }
    return properties;
  }
}

export default LinkReferenceProcessor;
