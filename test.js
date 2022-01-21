const test = require("ava");
const mclip = require("./");

test("Basics", (t) => {
  const args = [
    "node",
    "my-cli-script",
    "file",
    "-vf",
    "--option=4",
    "file2",
    "-p",
  ];

  const expected = {
    f: true,
    list: ["file", "file2"],
    option: "4",
    p: true,
    v: true,
  };

  t.deepEqual(mclip(args), expected);
});

test("No arguments", (t) => {
  const args = [];

  const expected = { list: [] };

  t.deepEqual(mclip(args), expected);
});

test("Default values", (t) => {
  const args = ["node", "my-cli-script", "--option=4"];

  const defaults = { foo: 3, option: "value" };

  const expected = {
    list: [],
    option: "4",
    foo: 3,
  };

  t.deepEqual(mclip(args, defaults), expected);
});
