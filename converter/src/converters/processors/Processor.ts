import { RootContent } from 'mdast';
import escapeSpecialCharacters from '../../utils/ProcessorUtils.js';

abstract class Processor {
  constructor(protected template: string) {}

  protected shouldEscape(node: RootContent): boolean {
    return true;
  }

  protected abstract constructProperties(node: RootContent): Record<string, string>;

  public processPlaceholders(node: RootContent): string {
    const properties = this.constructProperties(node);

    if ('value' in properties && this.shouldEscape(node)) {
      properties.value = escapeSpecialCharacters(properties.value);
    }

    return Object.entries(properties).reduce(
      (result, [key, value]) => result.replace(`{${key}}`, value),
      this.template,
    );
  }
}

export default Processor;
