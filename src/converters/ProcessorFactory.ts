import HeadingProcessor from './processors/HeadingProcessor';
import Processor from './processors/Processor';
import SpecialTextProcessor from './processors/SpecialTextProcessor';
import TextProcessor from './processors/TextProcessor';

class ProcessorFactory {
  private static processors: Record<string, Processor> = {
    heading: new HeadingProcessor('<Title level="{depth}">{value}</Title>'),
    text: new TextProcessor('<Text text="{value}" />'),
    emphasis: new SpecialTextProcessor(
      '<Text text="{value}" class="emphasis"/>',
    ), // TEMPORARY
    strong: new SpecialTextProcessor('<Text text="{value}" class="strong"/>'), // TEMPORARY
    delete: new SpecialTextProcessor('<Text text="{value}" class="delete"/>'), // NEEDS FIX: delete isnt a class of Text element
  };

  public static getProcessor(type: string): Processor {
    return this.processors[type];
  }
}

export default ProcessorFactory;
