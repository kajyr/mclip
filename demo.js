#!/usr/bin/env node

const mclip = require("./");

const options = mclip(process.argv, {
  foo: { default: "banana", description: "Sets the foo", alias: "f" },
  boo: { description: "This option does something" },
  tem: { alias: "t" },
});

console.log(options);
