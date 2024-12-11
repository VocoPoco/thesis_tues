import { Content } from 'mdast';

abstract class Processor {
  constructor(protected template: string) {}

  protected abstract constructProperties(node: Content): Record<string, string>;

  protected processPlaceholders(node: Content): string {
    return Object.entries(this.constructProperties(node)).reduce(
      (result, [key, value]) => result.replace(`{${key}}`, value),
      this.template,
    );
  }
}

export default Processor;
