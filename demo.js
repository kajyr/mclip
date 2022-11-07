#!/usr/bin/env node

const { mclip } = require("./build");

const options = mclip(process.argv, {
  foo: { default: "banana", description: "Sets the foo", short: "f" },
  boo: { description: "This option does something" },
  tem: { short: "t" },
});

console.log(options);
