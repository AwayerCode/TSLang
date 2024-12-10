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
    console.log('Creating file structure...\n');
    
    const root = new TFold("root");
    const docs = new TFold("documents");
    const pics = new TFold("pictures");
    
    const file1 = new TFile("report", "doc");
    const file2 = new TFile("budget", "xlsx");
    const file3 = new TFile("vacation", "jpg");
    const file4 = new TFile("family", "png");
    
    // 使用链式调用构建文件结构
    docs.add(file1, file2);
    pics.add(file3, file4);
    root.add(docs, pics);

    console.log('\nDisplaying file structure:');
    root.display(0);
}