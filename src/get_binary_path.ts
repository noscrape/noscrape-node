import { platform, arch } from 'os';
import { join } from 'path';
import { existsSync } from "node:fs";

export const getBinaryPath = (): string => {
  const os = platform();
  const ar = arch();

  const binaryPath = join(__dirname, '..', 'bin', `noscrape_${os}_${ar}`);


  if (existsSync(binaryPath)) {
    return binaryPath
  }

  throw new Error("os/arch not supported")
};
