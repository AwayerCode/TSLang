// 1. 添加状态接口，使代码更加类型安全
interface State {
    name: string;
    content: {
        key: string;
        value: any;
    };
    state: string;
    step: number;
}

// 2. 重命名 Context 为 Memento，使其更符合设计模式命名
class Memento {
    private state: State;

    constructor(state: State) {
        this.state = { ...state }; // 创建状态的深拷贝
    }

    getState(): State {
        return { ...this.state }; // 返回状态的深拷贝
    }
}

// 3. 重构 Algorithm 类为 Originator
class Originator {
    private state: State;

    constructor(state?: State) {
        this.state = state || {
            name: '',
            content: {
                key: '',
                value: ''
            },
            state: '',
            step: 0
        };
    }

    // 修改状态
    public changeState(newState: Partial<State>): void {
        this.state = { ...this.state, ...newState };
    }

    // 创建备忘录
    public save(): Memento {
        return new Memento(this.state);
    }

    // 从备忘录恢复
    public restore(memento: Memento): void {
        this.state = memento.getState();
    }

    public execute(): void {
        console.log(`当前状态: ${JSON.stringify(this.state)}`);
    }
}

// 4. 添加备忘录管理器
class Caretaker {
    private mementos: Memento[] = [];
    
    public addMemento(memento: Memento): void {
        this.mementos.push(memento);
    }

    public getMemento(index: number): Memento {
        return this.mementos[index];
    }
}

// 5. 优化测试函数
export function testMemento(): void {
    // 创建发起人并设置初始状态
    const originator = new Originator({
        name: "测试任务",
        content: { key: "初始内容", value: "someValue" },
        state: "开始",
        step: 1
    });

    // 创建备忘录管理器
    const caretaker = new Caretaker();

    // 执行初始状态
    originator.execute();

    // 保存当前状态
    caretaker.addMemento(originator.save());

    // 修改状态
    originator.changeState({ 
        content: { key: "修改后的内容", value: "someValue" },
        state: "进行中",
        step: 2 
    });
    originator.execute();

    // 恢复到之前的状态
    originator.restore(caretaker.getMemento(0));
    originator.execute();
}
