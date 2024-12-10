import { InputMode } from './types';
import { DataInput } from './data-input';
import { CSVInput } from './csv-input';
import { ExcelInput } from './excel-input';

export class InputFactory {
  static createInput(mode: InputMode): DataInput {
    switch (mode) {
      case InputMode.CSV:
        return new CSVInput();
      case InputMode.EXCEL:
        return new ExcelInput();
      default:
        throw new Error(`不支持的输入模式: ${mode}`);
    }
  }
} 