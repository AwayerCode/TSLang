import { DataInput } from './data-input';
import { DataFrame, DataInputOptions } from './types';
import * as XLSX from 'xlsx';

export class ExcelInput extends DataInput {
  protected data: DataFrame | null = null;

  async readData(source: string, options: DataInputOptions = {}): Promise<DataFrame> {
    try {
      const workbook = XLSX.readFile(source);
      const sheetName = options.sheetName || workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as Record<string, any>[];
      const columns = Object.keys(jsonData[0] || {});
      const data = jsonData.map(record => 
        columns.map(col => record[col])
      );
      
      this.data = { data, columns };
      return this.data;
    } catch (e: any) {
      throw new Error(`读取Excel文件失败: ${e.message}`);
    }
  }
} 