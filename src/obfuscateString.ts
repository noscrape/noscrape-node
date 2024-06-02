import { includes, omitBy } from "lodash";

const puaRange = Array.from({ length: 0xf8ff - 0xe000 }, (_, i) => 0xe000 + i);
export const obfuscateString = (
  text: string,
  mapping: Record<string, number>,
) => {
  const availableChars = omitBy(puaRange, (v) => includes(mapping, v));

  let obfuscated = "";

  for (const c of text) {
    if (!mapping[c]) {
      const keys = Object.keys(availableChars).map((k) => +k);
      const randomKeyIndex = Math.floor(Math.random() * keys.length);
      const randomKey = keys[randomKeyIndex];
      mapping[c] = availableChars[randomKey];
      delete availableChars[randomKey];
    }

    obfuscated += String.fromCharCode(mapping[c]);
  }

  return obfuscated;
};
