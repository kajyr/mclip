const test = require("ava");
const mclip = require("../");

test("Aliases", (t) => {
  const args = ["node", "my-cli-script", "-o=value"];

  const config = {
    option: { short: "o" },
  };

  const expected = {
    list: [],
    option: "value",
  };

  t.deepEqual(mclip(args, config), expected);
});

test("Joining aliases and short", (t) => {
  const args = ["node", "my-cli-script", "-vo=value"];

  const config = {
    option: { short: "o" },
  };

  const expected = {
    list: [],
    option: "value",
    v: true,
  };

  t.deepEqual(mclip(args, config), expected);
});
