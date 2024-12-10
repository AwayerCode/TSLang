export enum InputMode {
  CSV = 'CSV',
  EXCEL = 'EXCEL'
}

export interface DataFrame {
  data: (string | number | null)[][];
  columns: string[];
}

export interface DataInputOptions {
  encoding?: BufferEncoding;
  sheetName?: string | number;
} 