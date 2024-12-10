import type { Answers, QuestionCollection } from 'inquirer';
import inquirer from 'inquirer';
import { existsSync, statSync, readdirSync } from 'fs';
import { extname, join } from 'path';
import chalk from 'chalk';
import { InputMode } from './types';

export interface CLIInputResult {
  filePath: string;
  mode: InputMode;
  encoding?: BufferEncoding;
  sheetName?: string;
}

export class CLIInput {
  private static readonly DATA_DIR = join(__dirname, '..', 'data');

  private static validatePath(filePath: string): boolean {
    try {
      if (!existsSync(filePath)) {
        console.error(chalk.red('错误: 文件不存在'));
        return false;
      }

      const stats = statSync(filePath);
      if (!stats.isFile()) {
        console.error(chalk.red('错误: 路径不是一个文件'));
        return false;
      }

      return true;
    } catch (error) {
      console.error(chalk.red(`错误: ${error}`));
      return false;
    }
  }

  private static getFileType(filePath: string): InputMode | null {
    const ext = extname(filePath).toLowerCase();
    switch (ext) {
      case '.csv':
        return InputMode.CSV;
      case '.xlsx':
      case '.xls':
        return InputMode.EXCEL;
      default:
        return null;
    }
  }

  private static getAvailableFiles(): string[] {
    if (!existsSync(this.DATA_DIR)) {
      throw new Error(chalk.red(`数据目录不存在: ${this.DATA_DIR}`));
    }

    return readdirSync(this.DATA_DIR)
      .filter(file => {
        const filePath = join(this.DATA_DIR, file);
        return statSync(filePath).isFile() && this.getFileType(file) !== null;
      })
      .sort((a, b) => a.localeCompare(b)); // 按文件名排序
  }

  static async prompt(): Promise<CLIInputResult> {
    const files = this.getAvailableFiles();

    if (files.length === 0) {
      throw new Error(chalk.red(`在 src/data 目录中没有找到可用的数据文件 (.csv, .xlsx, .xls)`));
    }

    console.log(chalk.blue('\n可用的数据文件:'));
    files.forEach((file, index) => {
      const type = this.getFileType(file);
      console.log(chalk.gray(`${index + 1}. ${file} (${type})`));
    });

    const { selectedFile } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedFile',
        message: '请选择要处理的数据文件:',
        choices: files.map(file => ({
          name: `${file} (${this.getFileType(file)})`,
          value: file
        })),
        pageSize: 10
      }
    ]);

    const filePath = join(this.DATA_DIR, selectedFile);
    const mode = this.getFileType(selectedFile)!;

    let additionalOptions = {};

    if (mode === InputMode.CSV) {
      const { encoding } = await inquirer.prompt([
        {
          type: 'list',
          name: 'encoding',
          message: '请选择文件编码:',
          choices: [
            { name: 'UTF-8', value: 'utf-8' },
            { name: 'UTF-16 LE', value: 'utf16le' },
            { name: 'ASCII', value: 'ascii' },
            { name: 'GB2312', value: 'gb2312' },
          ],
          default: 'utf-8'
        }
      ]);
      additionalOptions = { encoding };
    }

    if (mode === InputMode.EXCEL) {
      const { sheetName } = await inquirer.prompt([
        {
          type: 'input',
          name: 'sheetName',
          message: '请输入工作表名称 (留空使用第一个工作表):',
          default: ''
        }
      ]);
      if (sheetName) {
        additionalOptions = { sheetName };
      }
    }

    return {
      filePath,
      mode,
      ...additionalOptions
    };
  }
} 