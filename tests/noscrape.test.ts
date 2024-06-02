import { expect } from "@jest/globals";
import { Noscrape } from "../src/noscrape";

const fontFile = __dirname + "/../example/example.ttf";

describe("test noscrape", () => {
  test("benchmark", () => {
    expect(true).toBeTruthy();
  });

  test("obfuscate", () => {
    const noscrape = new Noscrape(fontFile);
    const obfuscatedString = noscrape.obfuscate("test");
    expect(obfuscatedString).toHaveLength(4);

    const obfuscatedNumber = noscrape.obfuscate(1234);
    expect(obfuscatedNumber).toHaveLength(4);

    const obfuscatedObject = noscrape.obfuscate({
      test: "string",
      another: {
        test: "another string",
      },
    });
    expect(obfuscatedObject.another.test).toHaveLength(14);
  });

  test("test rendering", async () => {
    const noscrape = new Noscrape(fontFile);
    const obfuscated = noscrape.obfuscate("test");
    expect(obfuscated).toHaveLength(4);

    const r = await noscrape.render();
    expect(r.toString("base64")).toHaveLength(4720);
  });
});
