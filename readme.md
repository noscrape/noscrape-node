# Noscrape Node

## Installation

```shell
npm install @noscrape/noscrape
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
