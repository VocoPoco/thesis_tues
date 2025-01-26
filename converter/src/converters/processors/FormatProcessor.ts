class FormatProcessor {
  private static _instance: FormatProcessor;
  private _templateMap: Map<number, string[]>;

  public get templateMap(): Map<number, string[]> {
    return this._templateMap;
  }
  public set templateMap(value: Map<number, string[]>) {
    this._templateMap = value;
  }

  private constructor() {
    this._templateMap = new Map<number, string[]>();
  }

  public static get Instance(): FormatProcessor {
    return this._instance || (this._instance = new this());
  }

  public addTemplate(line: number, template: string): void {
    if (!this._templateMap.has(line)) {
      this._templateMap.set(line, []);
    }
    this._templateMap.get(line)?.push(template);
  }

  public getTemplates(line: number): string[] {
    return this._templateMap.get(line) || [];
  }

  public getMap(): Map<number, string[]> {
    return this._templateMap;
  }

  public wrapTemplates(): string[] {
    const wrappedResults: string[] = [];
    const keys = Array.from(this._templateMap.keys());
    const maxKey = Math.max(...keys);

    for (let i = 1; i <= maxKey; i++) {
      if (this._templateMap.has(i)) {
        const templates = this._templateMap.get(i)!.join('\n');
        wrappedResults.push(`<HBox>${templates}</HBox>`);
      } else {
        wrappedResults.push('<Text text="‎"/>');
      }
    }

    return wrappedResults;
  }
}

export default FormatProcessor;
