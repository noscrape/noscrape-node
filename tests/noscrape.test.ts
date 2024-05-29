import {expect} from "@jest/globals";
import {Noscrape} from "../src/noscrape";

const fontFile = __dirname + '/../example/example.ttf'

describe("test noscrape", () => {
    test("benchmark", () => {
        expect(true).toBeTruthy()
    })


    test("obfuscate", () => {
        const noscrape = new Noscrape(fontFile);
        const obfuscated = noscrape.obfuscate("test");
        expect(obfuscated).toHaveLength(4)
    })

    test("test rendering", async () => {
        const noscrape = new Noscrape(fontFile);
        const obfuscated = noscrape.obfuscate("test");
        expect(obfuscated).toHaveLength(4)

        const r = await noscrape.render();
        expect(r.toString("base64")).toHaveLength(4720)
    })
})
