const test = require("ava");
const mclip = require("../");

test("Short flags joined", (t) => {
  const args = ["node", "my-cli-script", "-pvg"];

  const expected = {
    list: [],
    p: true,
    v: true,
    g: true,
  };

  t.deepEqual(mclip(args), expected);
});

test("Short flags separated", (t) => {
  const args = ["node", "my-cli-script", "-p", "-v", "-g"];

  const expected = {
    list: [],
    p: true,
    v: true,
    g: true,
  };

  t.deepEqual(mclip(args), expected);
});

test("Borderline: joined + value", (t) => {
  const args = ["node", "my-cli-script", "-pve=foo"];

  const expected = {
    list: [],
    p: true,
    v: true,
    e: "foo",
  };

  t.deepEqual(mclip(args), expected);
});
