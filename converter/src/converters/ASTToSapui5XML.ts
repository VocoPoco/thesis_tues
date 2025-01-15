import { Parent, Root, RootContent } from 'mdast';
import FileManager from '../utils/FileManager.js';
import ProcessorFactory from './ASTProcessorFactory.js';
import Converter from './Converter.js';

const TOP_LIP = `<mvc:View
	controllerName="com.thesistues.ui5app.controller.Main"
	displayBlock="true"
	xmlns="sap.m"
	xmlns:mvc="sap.ui.core.mvc"
	xmlns:core="sap.ui.core"
	xmlns:code="sap.ui.codeeditor"
	core:require="{
		formatter: 'com/thesistues/ui5app/model/formatter'
	}">

	<Page
		title="{i18n>appTitle}"
		id="page">
		<content>`;

const BOTTOM_LIP = `		</content>
	</Page>

</mvc:View>`;

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

    return `${TOP_LIP}${result}${BOTTOM_LIP}`;
  }

  public export(
    content: string,
    dirname: string = '../ui5-app/webapp/view',
    filename: string = 'Main',
    format: string = 'view.xml',
  ): void {
    const filePath: string = `${dirname}/${filename}.${format}`;
    FileManager.saveAsFile(filePath, content);
  }
}

export default ASTToSapui5XML;
