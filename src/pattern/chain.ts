interface FilterBase {
    process(data: string): boolean;
}

class FilterA implements FilterBase {
    process(data: string): boolean {
        if(data.includes("A")) {
            console.log('FilterA: Found content containing A');
            return true;
        }
        console.log('FilterA: A not found');
        return false;
    }
}

class FilterB implements FilterBase {
    process(data: string): boolean {
        if(data.includes("B")) {
            console.log('FilterB: Found content containing B');
            return true;
        }
        console.log('FilterB: B not found');
        return false;
    }
}

class FilterMange {
    public addFilter(filter: FilterBase): void {
        this.filters.push(filter);
    }

    public process(data: string): void {
        console.log(`Start processing data: "${data}"`);
        for (const filter of this.filters) {
            if(filter.process(data)) {
                console.log('Filter matched, stopping chain');
                return;
            }
        }
        console.log('All filters completed');
    }

    private filters: FilterBase[] = [];
}



export function testChain(): void {
    const filterMange = new FilterMange();
    filterMange.addFilter(new FilterA());
    filterMange.addFilter(new FilterB());
    filterMange.process("Hello, world!");
}
