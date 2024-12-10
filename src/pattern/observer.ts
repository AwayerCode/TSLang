import { subscribe } from "diagnostics_channel";

interface Observer {
  update(message: string): void;
}

class ConcreteObserver implements Observer {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    update(message: string): void {
        console.log(`${this.name} received message: ${message}`);
    }
}

class Subject {
  private observers: Observer[] = [];

  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    this.observers = this.observers.filter(o => o !== observer);
  }

  updateMessage(message: string): void {
    this.observers.forEach(observer => observer.update(message));
  }
}

export function testObserver(): void {
    const subscribe = new Subject();
    const observer1 = new ConcreteObserver("Observer 1");
    const observer2 = new ConcreteObserver("Observer 2");

    subscribe.addObserver(observer1);
    subscribe.addObserver(observer2);

    subscribe.updateMessage("Hello, world!");
}

