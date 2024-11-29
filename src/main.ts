import MarkdownToASTConverter from './converters/MarkdownToAST.js';
import FileManager from './utils/FileManager.js';

async function main() {
  const markdownContent = await FileManager.readFile(
    'src/resources/md_example.md',
  );
  const mdConverter = new MarkdownToASTConverter();
  const ast = mdConverter.convert(markdownContent);

  await mdConverter.export(JSON.stringify(ast, null, 2));

  console.log('Conversion complete.');
}

main().catch((error) => {
  console.error('Error:', error);
});
