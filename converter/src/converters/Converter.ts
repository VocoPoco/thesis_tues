abstract class Converter<InputType, OutputType> {
  protected abstract convert(
    input: InputType,
  ): OutputType | Promise<OutputType>;
  protected abstract export(
    content: string,
    dirname: string,
    filename: string,
    format: string,
  ): void;
}

export default Converter;
