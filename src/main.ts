import ASTToSapui5XML from './converters/ASTToSapui5XML.js';
import MarkdownToASTConverter from './converters/MarkdownToAST.js';
import FileManager from './utils/FileManager.js';

async function main() {
  const markdownContent = await FileManager.readFile(
    'src/resources/md_example.md',
  );
  const astConverter = new MarkdownToASTConverter();
  const xmlConverter = new ASTToSapui5XML();

  const ast = await astConverter.convert(markdownContent);
  const xml = xmlConverter.convert(ast);

  await astConverter.export(JSON.stringify(ast, null, 2));
  await xmlConverter.export(xml);
  console.log('Conversion complete.');
}

main().catch((error) => {
  console.error('Error:', error);
});
