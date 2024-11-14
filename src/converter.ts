import { promises as fs } from 'fs';
import MarkdownIt from 'markdown-it';
import Constants from './shared/constants';

const SAP_M_TAGS = Constants.SAP_M_TAGS;
const SAP_UI_CODEEDITOR_TAGS = Constants.SAP_UI_CODEEDITOR_TAGS;
const SAP_UI_TABLE_TAGS = Constants.SAP_UI_TABLE_TAGS;

async function convertMarkdownToHtml(sourceMarkdown: string): Promise<string> {
  const md = new MarkdownIt();

  const markdownContent = await fs.readFile(sourceMarkdown, 'utf8');

  const htmlContent = md.render(markdownContent);
  return htmlContent
}

// TODO: apply the available html styles from the conversion of the markdown to the converted SAPUI5 xml elements
// TODO: add a strikethrough
// TODOO: fix the blockquote  
// TODO: fix the code
function convertHtmlToXML(sourceHtml: string): string {
  let xmlContent = sourceHtml;
  const namespaceMaps = [SAP_M_TAGS, SAP_UI_CODEEDITOR_TAGS, SAP_UI_TABLE_TAGS];
  for (const map of namespaceMaps) {
    xmlContent = _applyTagMappings(xmlContent, map);
  }
  return xmlContent;
}

function _applyTagMappings(sourceHtml: string, tagMap: { [key: string]: string }): string {
  let updatedHtml = sourceHtml;

  for (const [htmlTag, sapUi5Tag] of Object.entries(tagMap)) {
  // TODO: handle the <p><smth_else></p></smth_else> case
    if (htmlTag == "p") {
      updatedHtml = _handleTextCase(updatedHtml, sapUi5Tag);  
    }
    else if (htmlTag === "code") {
      updatedHtml = _handleCodeTagCase(updatedHtml, sapUi5Tag);
    } else {
      updatedHtml = _handleDefaultTagCase(updatedHtml, htmlTag, sapUi5Tag);
    }
  }
  return updatedHtml;
}

function _handleTextCase(html: string, sapUi5Tag: string): string {
  const pTagPattern = /<p\b[^>]*>([\s\S]*?)<\/p>/gi;

  return html.replace(pTagPattern, (match, content) => {
    const textSpecificTags = ["strong", "em", "s", "blockquote"];
    let hasTextSpecificTag = false;

    textSpecificTags.forEach(tag => {
      if (content.includes(`<${tag}`)) {
        hasTextSpecificTag = true;
      }
    });

    if (!hasTextSpecificTag) {
      content = `${_SAP_M["p"]}${content}</Text>`;
    } else {
      content = content.replace(/<(strong|em|s|blockquote)>(.*?)<\/\1>/gi, (nestedMatch, nestedTag, nestedContent) => {
        if (_SAP_M[nestedTag]) {
          return `${_SAP_M[nestedTag]}${nestedContent}</Text>`;
        }
        return nestedMatch;
      });
    }

    return content;
  });
}


function _handleCodeTagCase(html: string, sapUi5Tag: string): string {
  const tagPattern = /<code\b[^>]*>(.*?)<\/code>/gis;
  return html.replace(tagPattern, (match, codeText) => {
    const languageMatch = match.match(/class=["']?language-(\w+)["']?/i);
    const language = languageMatch ? languageMatch[1] : '';
    return sapUi5Tag
      .replace('{language}', language)
      .replace('{text}', codeText.trim());
  });
}

function _handleBlockquoteTagCase(html: string, htmlTag: string, sapUi5Tag: string): string {
  const blockquotePattern = /<blockquote>(.*?)<\/blockquote>/gis;
  return html.replace(blockquotePattern, (match, content) => {
    const textContent = content.replace(/<p>(.*?)<\/p>/g, '$1'); 
    return sapUi5Tag.replace('{text}', textContent);
  });
}


function _handleDefaultTagCase(html: string, htmlTag: string , sapUi5Tag: string): string {
  // create a regex expression that gets everything in the <> however in the closing bracket </> get only until the first space
  const openTagPattern = new RegExp(`<${htmlTag}([^>]*)>`, 'gi');
  const closeTagPattern = new RegExp(`</${htmlTag}>`, 'gi');
  const sapUi5OpenTag = sapUi5Tag.replace('{text}', '$1');
  const sapUi5CloseTag = `</${sapUi5Tag.match(/<(\w+)/)?.[1] || htmlTag}>`;

  html = html.replace(openTagPattern, sapUi5OpenTag);
  html = html.replace(closeTagPattern, sapUi5CloseTag);
  return html;
}

(async () => {
  const htmlContent = await convertMarkdownToHtml('src/data/test.md');
  await fs.writeFile('src/data/test.html', htmlContent);

  const xmlContent = convertHtmlToXML(htmlContent);
  await fs.writeFile('src/data/test.xml', xmlContent);

  console.log('Conversion completed. Files saved as test.html and test.xml.');
})();