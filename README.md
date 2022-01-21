# mclip

Minimal cli args parser.

## Installation

```
npm install mclip
```

## Usage

```
const mclip = require("mclip");

const options = mclip(process.argv);

```

**defining default values**

It's possible to define a default value for an option in case it's not specified in the argv

```
const mclip = require("mclip");

const options = mclip(process.argv, {
  foo: { default: "banana", description: "Sets the foo", alias: "f" },
  boo: { description: "This option does something" },
  tem: { alias: "t" },
});


```

**printing usage information**

It's possible to define descriptions about the expected parameters; if the script is called with `--help` it will print the usage informations and exit.
