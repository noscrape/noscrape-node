import { getBinaryPath } from "./get_binary_path";
import { existsSync } from "node:fs";
import { exec } from "node:child_process";
import { obfuscateString } from "./obfuscateString";

type ObfuscationTypes = string | number | object;

export class Noscrape {
  private readonly fontPath: string;
  private readonly binaryPath: string;

  private mapping: Record<string, number> = {};

  constructor(fontPath: string) {
    this.fontPath = fontPath;
    this.binaryPath = getBinaryPath();

    if (!existsSync(this.fontPath)) {
      throw new Error("could not read font-file");
    }
  }

  public obfuscate(data: string): string;
  public obfuscate(data: number): number;
  public obfuscate<T extends object>(data: T): T;
  public obfuscate(data: ObfuscationTypes): ObfuscationTypes {
    if (typeof data === "string") {
      return obfuscateString(data, this.mapping);
    }

    if (typeof data === "number") {
      return obfuscateString(`${data}`, this.mapping);
    }

    const newData: any = {};
    for (const [key, value] of Object.entries(data)) {
      newData[key] = this.obfuscate(value);
    }
    return newData;
  }

  public async render(): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const options = JSON.stringify({
        font: this.fontPath,
        translation: this.mapping,
      });

      exec(`${this.binaryPath} '${options}'`, (err, stdout, stderr) => {
        if (err) {
          reject(err);
        }
        if (stderr) {
          reject(err);
        }
        resolve(Buffer.from(stdout, "base64"));
      });
    });
  }
}
