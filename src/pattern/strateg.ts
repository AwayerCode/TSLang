abstract class StrategyBase {
    abstract excuteAlgorithm(): void;
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }
}

class StrategyA extends StrategyBase {
    constructor(name: string) {
        super(name);
    }

    excuteAlgorithm(): void {
        console.log(`${this.name} is excuting algorithm.`);
    }
}

class StrategyB extends StrategyBase {
    constructor(name: string) {
        super(name);
    }

    excuteAlgorithm(): void {
        console.log(`${this.name} is excuting algorithm.`);
    }
}

class Context {
    private strategyVec: StrategyBase[];

    constructor() {
        this.strategyVec = [];
    }

    public excuteStrategy(index: number): void {
        this.strategyVec[index].excuteAlgorithm();
    }

    public addStrategy(strategy: StrategyBase): void {
        this.strategyVec.push(strategy);
    }
}

enum StrategyType {
    StrategyA = 0,
    StrategyB = 1,
}

export function testStrategy(): void {
    const context = new Context();
    context.addStrategy(new StrategyA("StrategyA"));
    context.addStrategy(new StrategyB("StrategyB"));
    context.excuteStrategy(StrategyType.StrategyB);
}