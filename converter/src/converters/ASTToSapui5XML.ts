import { Parent, Root, RootContent } from 'mdast';
import FileManager from '../utils/FileManager.js';
import ProcessorUtils from '../utils/ProcessorUtils.js';
import ProcessorFactory from './ASTProcessorFactory.js';
import FormatProcessor from './processors/FormatProcessor.js';
import DefinitionProcessor from './processors/type/DefinitionProcessor.js';
import ReferenceProcessor from './processors/type/ReferenceProcessor.js';

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

class ASTToSapui5XML {
  private formatProcessor = FormatProcessor.Instance;

  private convertChild(node: RootContent): void {
    const processor = ProcessorFactory.getProcessor(node.type);

    if (processor) {
      const result = processor.processPlaceholders(node);
      const line = node.position?.start.line;
      if (line !== undefined) {
        this.formatProcessor.addTemplate(line, result);
      }
      return;
    }

    const children = 'children' in node ? (node as Parent).children || [] : [];
    children.forEach((child) => this.convertChild(child));
  }

  public convert(content: Root): string {
    content.children.forEach((child) => this.convertChild(child));

    const linkReferenceProcessor = ProcessorFactory.getProcessor(
      'linkReference',
    ) as ReferenceProcessor;
    const imageReferenceProcessor = ProcessorFactory.getProcessor(
      'imageReference',
    ) as ReferenceProcessor;
    const definitionProcessor = ProcessorFactory.getProcessor(
      'definition',
    ) as DefinitionProcessor;

    console.log(
      imageReferenceProcessor.lineMap,
      definitionProcessor.definitions,
      this.formatProcessor.templateMap,
    );
    ProcessorUtils.resolveReferences(
      linkReferenceProcessor.lineMap,
      definitionProcessor.definitions,
      this.formatProcessor.templateMap,
    );

    ProcessorUtils.resolveReferences(
      imageReferenceProcessor.lineMap,
      definitionProcessor.definitions,
      this.formatProcessor.templateMap,
    );

    const wrappedTemplates = this.formatProcessor.wrapTemplates();
    return `${TOP_LIP}${wrappedTemplates.join('\n')}${BOTTOM_LIP}`;
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
