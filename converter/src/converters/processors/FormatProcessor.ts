class FormatProcessor {
  private static _instance: FormatProcessor;
  private templateMap: Map<number, string[]>;

  private constructor() {
    this.templateMap = new Map<number, string[]>();
  }

  public static get Instance(): FormatProcessor {
    return this._instance || (this._instance = new this());
  }

  public addTemplate(line: number, template: string): void {
    if (!this.templateMap.has(line)) {
      this.templateMap.set(line, []);
    }
    this.templateMap.get(line)?.push(template);
  }

  public getTemplates(line: number): string[] {
    return this.templateMap.get(line) || [];
  }

  public getMap(): Map<number, string[]> {
    return this.templateMap;
  }

  public wrapTemplates(): string[] {
    const wrappedResults: string[] = [];
    const keys = Array.from(this.templateMap.keys());
    const maxKey = Math.max(...keys);

    for (let i = 1; i <= maxKey; i++) {
      if (this.templateMap.has(i)) {
        const templates = this.templateMap.get(i)!.join('\n');
        wrappedResults.push(`<HBox>${templates}</HBox>`);
      } else {
        wrappedResults.push('<Text text="‎"/>');
      }
    }

    return wrappedResults;
  }
}

export default FormatProcessor;
