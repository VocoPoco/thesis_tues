// import { Root } from 'mdast';
// import FileManager from '../utils/FileManager.js';
// import Converter from './Converter.js';

// class ASTToSapui5XML extends Converter<Root, string> {
//   private SAP_M_TAGS = {
//     heading: '<Title level={depth}>{value}<Title>',
//     text: '<Text text={value} class={type}>',
//     list: '<List>',
//     listItem: '<StandardListItem>',
//     blockquote: "<FormattedText htmlText='{text}'/>",
//     thematicBreak: "<ToolBar width='100%' height='1px'/>",
//     code: "<code:CodeEditor editable='false' lineNumbers='false' language={lang} value={value}>",
//     // TABLE: '<table:Table>',
//     // THEAD: '<table:Column>',
//     // TBODY: '<table:Row>',
//     // TR: '<table:Row>',
//     // TD: '<table:ColumnListItem>',
//     // TH: "<table:Column header='Header'>",
//   };
//   public convert    () {}
//   public export(
//     content: string,
//     dirname: string = 'src/resources',
//     filename: string = 'sapui5XML',
//     format: string = 'view.xml',
//   ): void {
//     const filePath: string = `${dirname}/${filename}.${format}`;
//     FileManager.saveAsFile(filePath, content);
//   }
// }

// export default ASTToSapui5XML;
