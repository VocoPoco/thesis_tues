import { RootContent } from 'mdast';
import CodeProcessor from './processors/CodeProcessor.js';
import HeadingProcessor from './processors/HeadingProcessor.js';
import ImageProcessor from './processors/ImageProcessor.js';
import LinkProcessor from './processors/LinkProcessor.js';
import ListProcessor from './processors/ListProcessor.js';
import Processor from './processors/Processor.js';
import SpecialTextProcessor from './processors/SpecialTextProcessor.js';
import TextProcessor from './processors/TextProcessor.js';

class ProcessorFactory {
  private static definitions: Record<string, { url: string; title: string }> =
    {};
  private static pendingReferences: Record<string, RootContent[]> = {};

  private static processors: Record<string, Processor> = {
    heading: new HeadingProcessor('<Title level="{depth}" text="{value}"/>'),
    text: new TextProcessor('<Text text="{value}" />'),
    emphasis: new SpecialTextProcessor(
      '<Text text="{value}" class="emphasis"/>',
    ), // TEMPORARY
    strong: new SpecialTextProcessor('<Text text="{value}" class="strong"/>'), // TEMPORARY
    code: new CodeProcessor(
      '<code:CodeEditor editable="false" lineNumbers="false" type="{lang}" value="{value}" />',
    ),
    link: new LinkProcessor(
      '<Link text="{value}" href="{url}" tooltip="{title}"/>',
    ),
    image: new ImageProcessor(
      '<Image src="{url}" alt="{alt}" tooltip="{title}"/>',
    ),
    list: new ListProcessor('<List>{value}</List>'),

    /* TABLE ELEMENTS THAT NEED PROCESSORS
    table: '<Table>{value}</Table>',
    tableRow: '<Row>{value}</Row>',
    tableCell: '<ColumnListItem>{value}</ColumnListItem>',
    */

    /* MORE ELEMENTS TO CONSIDER HANDLING
    delete: new SpecialTextProcessor('<Text text="{value}" class="delete"/>'), // NEEDS FIX: delete isnt a class of Text element
    linkReference: new LinkReferenceProcessor(
      '<Link text="{value}" href="{url}" />',
      this.definitions,
      this.pendingReferences,
    ),
    definition: new LinkReferenceProcessor(
      '<Link text="{value}" href="{url}" />',
      this.definitions,
      this.pendingReferences,
    ),
    // definition: ,
    // inlineCode: ,
    // footnoteDefinition: ,
    // footnoteReference: ,
    */
  };

  public static getProcessor(type: string): Processor {
    return this.processors[type];
  }
}

export default ProcessorFactory;
