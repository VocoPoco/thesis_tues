import { Root } from 'mdast';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import FileManager from '../utils/FileManager.js';
import Converter from './Converter.js';

class MarkdownToASTConverter extends Converter<string, Root> {
  public convert(content: string): Root {
    const astTree = unified().use(remarkParse).parse(content) as Root;
    return astTree;
  }

  public export(
    content: string,
    dirname: string = 'src/resources',
    filename: string = 'astTree',
    format: string = 'json',
  ) {
    const filePath: string = `${dirname}/${filename}.${format}`;
    FileManager.saveAsFile(filePath, content);
  }
}

export default MarkdownToASTConverter;
