# mclip

[![Build Status](https://github.com/kajyr/mclip/workflows/test/badge.svg)](https://github.com/kajyr/mclip/actions)

Minimal cli args parser.

## Installation

```bash
npm install mclip
```

## Usage

```js
import { mclip } from "mclip";

const options = mclip(process.argv);
```

**Why named export?**

Module is a namespace, and interop with commonjs is broken in many cases or hard to maintain. It's not really worth it.

### Defining default values

It's possible to define a default value for an option in case it's not specified in the argv

```js
import { mclip } from "mclip";

const options = mclip(process.argv, {
  boo: { description: "This option does something" },
  foo: { default: "banana", description: "Sets the foo", short: "f" },
  tem: { short: "t", default: true },
});
```

If you use Typescript the type of options returned will be:

```typescript
{
  boo: string | boolean | undefined;
  foo: string;
  help?: boolean;
  list: string[];
  tem: boolean;
}
```

### Positional arguments

Positional arguments will be found in a `list` property in the returned options.

```bash
./my-script mama -f=3 lama
```

```js
const { mclip } = require("mclip");

const options = mclip(process.argv);

console.log(options); // { foo: '3', list: [ 'mama', 'lama' ] }
```

### Validating parameters

```bash
./my-script --cat=4
```

```js
const { mclip } = require("mclip");

const options = mclip(process.argv, {
  cat: {
    validate: (str: string) => str !== "miao",
  },
});

// Throws an error
```

### Printing usage information

It's possible to define descriptions about the expected parameters; if the script is called with `--help` it will print the usage informations and exit.
