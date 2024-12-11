import * as os from 'os';

interface DisplayInfo {
  name: string;
  totalMemory: string;
  freeMemory: string;
  cpuModel: string;
  cpuCores: number;
  platform: string;
  arch: string;
  hostname: string;
}

export class DeviceScanner {
  private formatBytes(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }

  public async scanDisplays(): Promise<DisplayInfo[]> {
    try {
      const totalMem = os.totalmem();
      const freeMem = os.freemem();
      const cpus = os.cpus();
      
      return [{
        name: '系统信息',
        totalMemory: this.formatBytes(totalMem),
        freeMemory: this.formatBytes(freeMem),
        cpuModel: cpus[0].model,
        cpuCores: cpus.length,
        platform: os.platform(),
        arch: os.arch(),
        hostname: os.hostname()
      }];
    } catch (error) {
      console.error('获取系统信息失败:', error);
      return [];
    }
  }
} 