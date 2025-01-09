import { Root } from 'mdast';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm-configurable';
import remarkParse from 'remark-parse';
import FileManager from '../utils/FileManager.js';
import Converter from './Converter.js';

class MarkdownToASTConverter extends Converter<string, Root> {
  public convert(content: string): Root {
    const options = {
      plugins: {
        table: true,
        footnote: true,
      },
      singleTilde: false,
      tableCellPadding: true,
    };

    const astTree = remark()
      .use(remarkParse)
      .use(remarkGfm, options)
      .parse(content) as Root;
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
