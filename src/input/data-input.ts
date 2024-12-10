import { DataFrame, DataInputOptions } from './types';

export abstract class DataInput {
  protected data: DataFrame | null = null;

  constructor() {}

  abstract readData(source: string, options?: DataInputOptions): Promise<DataFrame>;

  protected validateData(): boolean {
    return this.data !== null;
  }

  getData(): DataFrame {
    if (this.validateData()) {
      return this.data!;
    }
    throw new Error('数据未正确加载或验证失败');
  }
} 