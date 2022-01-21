const printHelp = require("./help");

function clip(argv, config = {}) {
  if (!argv) {
    throw new Error("Missing argument: process.argv");
  }

  const defaults = {};
  const aliases = {};
  for (const [key, value] of Object.entries(config)) {
    if (value.default) {
      defaults[key] = value.default;
    }
    if (value.alias) {
      aliases[value.alias] = key;
    }
  }

  const args = argv.slice(2);
  const options = { list: [], ...defaults };

  for (const str of args) {
    if (str.startsWith("--")) {
      const [k, value] = str.slice(2).split("=");
      const key = aliases[k] || k;
      options[key] = value || true;
      continue;
    }

    if (str.startsWith("-")) {
      const keys = str.slice(1).split("");
      for (const k of keys) {
        const key = aliases[k] || k;
        options[key] = true;
      }
      continue;
    }

    options.list.push(str);
  }

  if (options.help) {
    printHelp(argv[1], config);
    process.exit();
  }

  return options;
}

module.exports = clip;
