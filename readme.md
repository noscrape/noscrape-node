# Noscrape

The primary mechanism behind noscrape is the utilization of any true-type font. From this, noscrape generates a new version with shuffled unicodes, ensuring that it's impossible to reverse-calculate them. This means that both strings and integers are obfuscated and can only be deciphered using the generated obfuscation-font.

## Installation

```shell
npm install noscrape
```

## New Instance

```typescript
import {Noscrape} from "./noscrape";

const noscrape = new Noscrape("path/to/font.ttf")
```

## Obfuscation

#### string
```typescript
const obfuscatedText = noscrape.obfuscate("text to obfuscate");
// 
```

#### number
```typescript
const obfuscatedText = noscrape.obfuscate(1234);
// 
```

#### object
```typescript
const obfuscatedText = noscrape.obfuscate({
    test: {
        nested: "test"
    }
});
// obfuscated.test.nested -> 
```

## Rendering
````typescript
const b64Font = await noscrape.render();
````

## Putting it together

```vue
<!DOCTYPE html>
<html lang="en">
<head>
<style>
    @font-face {
        font-family: 'noscrape-obfuscated';
        src: url("data:font/truetype;charset=utf-8;base64,{{b64Font}}")
    }

    .obfuscated {
        font-family: "noscrape-obfuscated";
    }
</style>
</head>
<body>
    <div class="obfuscated">{{obfuscatedText}}</div>
</body>
</html>
```
