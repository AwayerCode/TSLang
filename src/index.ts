import inquirer from 'inquirer';
import chalk from 'chalk';
import { DeviceScanner } from './media/devices';

interface CommandChoice {
  name: string;
  value: () => Promise<void>;
}

const mainChoices: CommandChoice[] = [
  {
    name: '扫描系统信息',
    value: async () => {
      const scanner = new DeviceScanner();
      console.log(chalk.blue('\n开始获取系统信息...'));
      
      try {
        const sysInfos = await scanner.scanDisplays();
        
        if (sysInfos.length === 0) {
          console.log(chalk.yellow('\n未能获取系统信息'));
          return;
        }

        const info = sysInfos[0];
        console.log(chalk.yellow('\n系统信息:'));
        console.log(chalk.gray('主机名:'), info.hostname);
        console.log(chalk.gray('操作系统:'), info.platform);
        console.log(chalk.gray('架构:'), info.arch);
        console.log(chalk.gray('CPU型号:'), info.cpuModel);
        console.log(chalk.gray('CPU核心数:'), info.cpuCores);
        console.log(chalk.gray('总内存:'), info.totalMemory);
        console.log(chalk.gray('可用内存:'), info.freeMemory);
      } catch (error) {
        console.error(chalk.red('\n获取信息出错:'), error);
      }
    }
  }
];

async function main() {
  console.log(chalk.blue('欢迎使用系统工具！'));
  
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: '请选择功能:',
        choices: [
          ...mainChoices.map(choice => ({
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

    await action.value();

    const { continue: shouldContinue } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: '是否返回主菜单？',
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