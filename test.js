const test = require("ava");
const mclip = require("./");

test("Basics", (t) => {
  const args = ["file", "-vf", "--option=4", "file2", "-p"];

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
