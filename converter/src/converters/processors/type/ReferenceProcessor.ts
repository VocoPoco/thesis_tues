import { RootContent } from 'mdast';
import Processor from './Processor.js';

class LinkReferenceProcessor extends Processor {
  private _linkReferenceMap: Map<string, string>;

  private _lineMap: Map<string, number>;

  public get lineMap(): Map<string, number> {
    return this._lineMap;
  }

  public get linkReferenceMap(): Map<string, string> {
    return this._linkReferenceMap;
  }

  constructor(template: string) {
    super(template);
    this._linkReferenceMap = new Map();
    this._lineMap = new Map();
  }

  public constructProperties(node: RootContent): Record<string, string> {
    const identifier = 'identifier' in node ? node.identifier : '';
    if (identifier) {
      this._linkReferenceMap.set(identifier, this.template);
      const line = node.position?.start.line;
      if (line !== undefined) {
        this.lineMap.set(identifier, line);
      }
      return { value: `{${identifier}}` };
    }
    return { value: '' };
  }
}

export default LinkReferenceProcessor;
