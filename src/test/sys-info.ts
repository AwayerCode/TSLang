import * as os from 'os';
import { readdirSync } from 'fs';


class Base {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }
}

class File extends Base {
    constructor(name: string) {
        super(name);
    }
}

export function SysInfo()
{
    console.log("----------start test sys info----------");

    type Name = string | number;


    console.log("Root directory contents:");
    try {
        const files = readdirSync('/');
        files.forEach((file: string) => {
            console.log(`- ${file}`);
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Failed to read root directory: ${error.message}`);
        } else {
            console.error('Failed to read root directory: Unknown error');
        }
    }

    console.log("----------end test sys info----------");
}