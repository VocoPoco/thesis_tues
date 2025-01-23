import { RootContent } from 'mdast';
import Processor from './Processor.js';

abstract class ReferenceProcessor extends Processor {
  protected _referenceMap: Map<string, string>;
  protected _lineMap: Map<string, number>;

  public get referenceMap(): Map<string, string> {
    return this._referenceMap;
  }

  public get lineMap(): Map<string, number> {
    return this._lineMap;
  }

  constructor(template: string) {
    super(template);
    this._referenceMap = new Map();
    this._lineMap = new Map();
  }

  public constructProperties(node: RootContent): Record<string, string> {
    const identifier = 'identifier' in node ? (node as any).identifier : '';
    const line = node.position?.start.line;

    if (identifier) {
      this._referenceMap.set(identifier, this.template);
      if (line !== undefined) {
        this._lineMap.set(identifier, line);
      }
    }

    return this.extractAdditionalProperties(node);
  }

  protected abstract extractAdditionalProperties(
    node: RootContent,
  ): Record<string, string>;
}

export default ReferenceProcessor;
