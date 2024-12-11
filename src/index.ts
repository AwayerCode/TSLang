import inquirer from 'inquirer';
import chalk from 'chalk';
import { DeviceScanner } from './media/devices';

interface CommandChoice {
  name: string;
  value: () => Promise<void>;
}

const mainChoices: CommandChoice[] = [
  {
    name: 'System Information',
    value: async () => {
      const scanner = new DeviceScanner();
      console.log(chalk.blue('\nStarting system scan...'));
      
      try {
        const sysInfos = await scanner.scanDisplays();
        
        if (sysInfos.length === 0) {
          console.log(chalk.yellow('\nNo system information available'));
          return;
        }

        const info = sysInfos[0];
        console.log(chalk.yellow('\nSystem Information:'));
        console.log(chalk.gray('Hostname:'), info.hostname);
        console.log(chalk.gray('Operating System:'), info.platform);
        console.log(chalk.gray('Architecture:'), info.arch);
        console.log(chalk.gray('CPU Model:'), info.cpuModel);
        console.log(chalk.gray('CPU Cores:'), info.cpuCores);
        console.log(chalk.gray('Total Memory:'), info.totalMemory);
        console.log(chalk.gray('Available Memory:'), info.freeMemory);
      } catch (error) {
        console.error(chalk.red('\nError getting system information:'), error);
      }
    }
  }
];

async function main() {
  console.log(chalk.blue('Welcome to System Tools!'));
  
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Please select a function:',
        choices: [
          ...mainChoices.map(choice => ({
            name: choice.name,
            value: choice
          })),
          {
            name: 'Exit',
            value: 'exit'
          }
        ]
      }
    ]);

    if (action === 'exit') {
      console.log(chalk.yellow('Thanks for using, goodbye!'));
      break;
    }

    await action.value();

    const { continue: shouldContinue } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continue',
        message: 'Return to main menu?',
        default: true
      }
    ]);

    if (!shouldContinue) {
      console.log(chalk.yellow('Thanks for using, goodbye!'));
      break;
    }
  }
}

main().catch(console.error);