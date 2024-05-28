import {getBinaryPath} from "./get_binary_path";
import {includes, omitBy} from "lodash";
import {existsSync} from "node:fs";
import {exec} from "child_process"
import {spawn} from "node:child_process";

export class Noscrape {
    private readonly fontPath: string;
    private readonly binaryPath: string;
    private puaRange = Array.from({length: 0xF8FF - 0xE000}, (_, i) => 0xE000 + i)
    private mapping: Record<string, number> = {"a": 57344}

    constructor(fontPath: string) {
        this.fontPath = fontPath;
        this.binaryPath = getBinaryPath();

        if (!existsSync(this.fontPath)) {
            throw new Error("could not read font-file")
        }
    }

    public obfuscate(text: string) {
        const availableChars = omitBy(this.puaRange, v => includes(this.mapping, v))

        let obfuscated = "";

        for (const c of text) {
            if (!this.mapping[c]) {
                const keys = Object.keys(availableChars).map(k => +k);
                const randomKeyIndex = Math.floor(Math.random() * keys.length);
                const randomKey = keys[randomKeyIndex];
                this.mapping[c] = availableChars[randomKey];
                delete availableChars[randomKey];
            }

            obfuscated += String.fromCharCode(this.mapping[c]);
        }

        return obfuscated;
    }

    public async render() {
        return new Promise((resolve, reject) => {
            const options = JSON.stringify({
                font: this.fontPath,
                translation: this.mapping
            });


            const child = spawn(this.binaryPath, [options]);

            let result = '';

            child.stdout.on('data', (data: string) => {
                result += data;
            });

            child.stderr.on('data', (data) => {
                // Handle stderr if needed
            });

            child.on('error', (error) => {
                reject(error);
            });

            child.on('close', (code) => {
                if (code === 0) {
                    resolve(result);
                } else {
                    reject(new Error(`Process exited with code ${code}`));
                }
            });
        })

    }
}
