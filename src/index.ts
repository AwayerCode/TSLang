import { App } from './app';
import * as Test from './test';
import * as Pattern from "./pattern"

async function bootstrap() {
  const app = App.getInstance();
  
  try {
    Test.SysInfo();
  } catch (error) {
    console.error('应用启动失败:', error);
    process.exit(1);
  }
}

// 启动应用
// bootstrap();

// Pattern.testObserver();
// Pattern.testChain();
// Pattern.testComposite();
// Pattern.testStrategy();
Pattern.testMemento();