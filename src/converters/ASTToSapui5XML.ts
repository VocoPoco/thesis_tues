import { Parent, Root, RootContent } from 'mdast';
import FileManager from '../utils/FileManager.js';
import Converter from './Converter.js';
import ProcessorFactory from './ProcessorFactory.js';

class ASTToSapui5XML extends Converter<Root, string> {
  private convertChild(node: RootContent): string {
    const processor = ProcessorFactory.getProcessor(node.type);
    if (processor) {
      return processor.processPlaceholders(node);
    }
    const children = 'children' in node ? (node as Parent).children || [] : [];
    return children.map((child) => this.convertChild(child)).join('');
  }

  public convert(content: Root): string {
    const queue: RootContent[] = [...content.children];
    let result = '';

    for (const child of queue) {
      result = `${result}${this.convertChild(child)}`;
    }

    return result;
  }

  public export(
    content: string,
    dirname: string = 'src/resources',
    filename: string = 'sapui5XML',
    format: string = 'view.xml',
  ): void {
    const filePath: string = `${dirname}/${filename}.${format}`;
    FileManager.saveAsFile(filePath, content);
  }
}

export default ASTToSapui5XML;
