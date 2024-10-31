import { promises as fs } from 'fs';
import MarkdownIt from 'markdown-it';

async function convertMarkdownToHtml(sourceMarkdown: string): Promise<string> {
  try {
    const md = new MarkdownIt();

    const markdownContent = await fs.readFile(sourceMarkdown, 'utf8');

    const htmlContent = md.render(markdownContent);
    return htmlContent
  } catch (err) {
    console.error(`Error: ${err}`);
    return ''
  }
}


function convertHtmlToXML(sourceHtml: string): string {
  let xmlContent = sourceHtml;
  xmlContent = _applySapMNamespace(xmlContent); 
  xmlContent = _applySapUILayoutNamespace(xmlContent);
  return xmlContent;
}

// (async () => {
//   const htmlContent = await convertMarkdownToHtml('src/data/test.md');
//   await fs.writeFile('src/data/test.html', htmlContent);

//   const xmlContent = convertHtmlToXML(htmlContent);
//   await fs.writeFile('src/data/test.xml', xmlContent);

//   console.log('Conversion completed. Files saved as test.html and test.xml.');
// })();


const _SAP_M_MAP: { [key: string]: string } = {
  "h1": "<Title level='H1'>",
  "h2": "<Title level='H2'>",
  "h4": "<Title level='H4'>",
  "h5": "<Title level='H5'>",
  "h6": "<Title level='H6'>",
  "p": "<Text>",
  "ul": "<List>",
  "ol": "<List>",
  "li": "<StandardListItem>",
  "blockquote": "<FormattedText>",
  "strong": "<Text class='bold'>",
  "em": "<Text class='italic'>",
  "code": "<Text class='codeBlock'>",
};

const _SAP_UI_LAYOUT_MAP: { [key: string]: string } = {
  "blockquote": "<layout:BlockLayout>",
  "div": "<layout:VerticalLayout>",      
  "section": "<layout:VerticalLayout>",         
  "aside": "<layout:VerticalLayout>",           
  "article": "<layout:VerticalLayout>",           
  "header": "<layout:VerticalLayout>",              
  "footer": "<layout:VerticalLayout>",            
  "table": "<layout:Grid>",                        
  "tr": "<layout:GridData>",                        
  "td": "<layout:GridData span='L1 M1 S1'>",         
  "ul": "<layout:VerticalLayout>",           
  "ol": "<layout:VerticalLayout>",                  
  "li": "<layout:FixFlex>",                       
  "hr": "<layout:HorizontalLayout>",              
  "figure": "<layout:HorizontalLayout>",        
  "figcaption": "<layout:VerticalLayout>",           
};


function _applyTagMappings(sourceHtml: string, tagMap: { [key: string]: string }): string {
  let updatedHtml = sourceHtml;
  for (const [htmlTag, sapUi5Tag] of Object.entries(tagMap)) {
    const openTagPattern = new RegExp(`<${htmlTag}>`, 'gi');
    const closeTagPattern = new RegExp(`</${htmlTag}>`, 'gi');
    const sapUi5CloseTag = `</${sapUi5Tag.match(/<(\w+)/)?.[1] || htmlTag}>`;

    updatedHtml = updatedHtml.replace(openTagPattern, sapUi5Tag);
    updatedHtml = updatedHtml.replace(closeTagPattern, sapUi5CloseTag);
  }
  return updatedHtml;
}

function _applySapMNamespace(xmlContent: string): string {
  return _applyTagMappings(xmlContent, _SAP_M_MAP);
}

function _applySapUILayoutNamespace(xmlContent: string): string {
  return _applyTagMappings(xmlContent, _SAP_UI_LAYOUT_MAP);
}