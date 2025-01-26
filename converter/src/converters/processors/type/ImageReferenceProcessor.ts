import { RootContent } from 'mdast';
import ReferenceProcessor from './ReferenceProcessor.js';

class ImageReferenceProcessor extends ReferenceProcessor {
  protected extractAdditionalProperties(
    node: RootContent,
  ): Record<string, string> {
    const alt = 'alt' in node ? (node as any).alt : '';

    return { value: alt };
  }
}

export default ImageReferenceProcessor;
