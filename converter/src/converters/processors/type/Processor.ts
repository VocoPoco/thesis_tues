import { RootContent } from 'mdast';

abstract class Processor {
  constructor(protected template: string) {}

  protected shouldEscape(): boolean {
    return true;
  }

  protected abstract constructProperties(
    node: RootContent,
  ): Record<string, string>;

  private escapeSpecialCharacters(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  public processPlaceholders(node: RootContent): string {
    const properties = this.constructProperties(node);

    if ('value' in properties && this.shouldEscape()) {
      properties.value = this.escapeSpecialCharacters(properties.value);
    }

    return Object.entries(properties).reduce(
      (result, [key, value]) => result.replace(`{${key}}`, value),
      this.template,
    );
  }
}

export default Processor;
