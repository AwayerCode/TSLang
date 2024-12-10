import inquirer from 'inquirer';
import chalk from 'chalk';
import * as Pattern from "./pattern";

interface CommandChoice {
  name: string;
  value: () => void;
}

const choices: CommandChoice[] = [
  {
    name: '观察者模式演示',
    value: Pattern.testObserver
  },
  {
    name: '责任链模式演示',
    value: Pattern.testChain
  },
  {
    name: '组合模式演示',
    value: Pattern.testComposite
  },
  {
    name: '策略模式演示',
    value: Pattern.testStrategy
  },
  {
    name: '备忘录模式演示',
    value: Pattern.testMemento
  }
];

async function main() {
  console.log(chalk.blue('欢迎使用设计模式演示程序！'));
  
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: '请选择要演示的设计模式:',
        choices: [
          ...choices.map(choice => ({
            name: choice.name,
            value: choice
          })),
          {
            name: '退出程序',
            value: 'exit'
          }
        ]
      }
    ]);

    if (action === 'exit') {
      console.log(chalk.yellow('感谢使用，再见！'));
      break;
    }

    console.log(chalk.green('\n开始演示...\n'));
    action.value();
    console.log(chalk.green('\n演示完成！\n'));

    const { continue: shouldContinue } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: '是否继续查看其他模式？',
        default: true
      }
    ]);

    if (!shouldContinue) {
      console.log(chalk.yellow('感谢使用，再见！'));
      break;
    }
  }
}

main().catch(console.error);