// 抽象基类
abstract class FileBase {
    protected constructor(
        protected readonly name: string,
        protected readonly type: string,
        public readonly isFold: boolean
    ) {}

    abstract display(depth: number): void;
    
    protected getIndent(depth: number): string {
        return '  '.repeat(depth);
    }

    getName(): string {
        return this.isFold ? this.name : `${this.name}.${this.type}`;
    }
}

// 文件类
class TFile extends FileBase {
    constructor(name: string, type: string) {
        super(name, type, false);
    }

    display(depth: number): void {
        console.log(`${this.getIndent(depth)}File: ${this.getName()}`);
    }
}

// 文件夹类
class TFold extends FileBase {
    private readonly files: FileBase[] = [];

    constructor(name: string) {
        super(name, 'fold', true);
    }

    display(depth: number): void {
        console.log(`${this.getIndent(depth)}Folder: ${this.getName()}`);
        this.files.forEach(file => file.display(depth + 1));
    }

    add(...files: FileBase[]): void {
        this.files.push(...files);
        files.forEach(file => {
            console.log(`Added ${file.isFold ? 'folder' : 'file'} "${file.getName()}" to folder "${this.name}"`);
        });
    }
}

// 测试函数优化
export function testComposite(): void {
    const root = new TFold("root");
    const fold1 = new TFold("fold1");
    const fold2 = new TFold("fold2");
    
    const file1 = new TFile("file1", "txt");
    const file2 = new TFile("file2", "doc");
    const file3 = new TFile("file3", "pdf");
    
    fold1.add(file1);
    fold2.add(file2, file3);
    root.add(fold1, fold2);
    
    root.display(0);
}