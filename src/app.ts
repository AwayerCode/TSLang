import { DataFrame, InputMode } from './input/types';
import { InputFactory } from './input/input-factory';
import { CLIInput } from './input/cli-input';
import chalk from 'chalk';

export class App {
  private static instance: App;

  private constructor() {}

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }
}