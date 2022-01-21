#!/usr/bin/env node

const mclip = require("./");

const options = mclip(
  process.argv,
  { foo: "banana" },
  { foo: "Sets the foo", o: "Output file" }
);

console.log(options);
