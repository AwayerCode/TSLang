import { DataInput } from './data-input';
import { DataFrame, DataInputOptions } from './types';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';

export class CSVInput extends DataInput {
  protected data: DataFrame | null = null;

  async readData(source: string, options: DataInputOptions = {}): Promise<DataFrame> {
    try {
      const content = readFileSync(source, {
        encoding: options.encoding || 'utf-8'
      });

      const records = parse(content, {
        columns: true,
        skip_empty_lines: true
      }) as Record<string, any>[];
      
      const columns = Object.keys(records[0] || {});
      const data = records.map(record => 
        columns.map(col => record[col])
      );
      
      this.data = { data, columns };
      return this.data;
    } catch (e: any) {
      throw new Error(`读取CSV文件失败: ${e.message}`);
    }
  }
} 