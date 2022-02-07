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
    if (value.short) {
      aliases[value.short] = key;
    }
  }

  const args = argv.slice(2);
  const options = { list: [], ...defaults };

  // Finally we can parse the args
  for (const str of args) {
    // If no dash, it's a positional argument
    if (!str.startsWith("-")) {
      options.list.push(str);
      continue;
    }

    let [keys, value] = str.split("=");
    value = value || true;

    // Double dash: it's a long parameter
    if (str.startsWith("--")) {
      const key = keys.slice(2);
      options[key] = value || true;
      continue;
    }

    // Single dash: it's a short parameter
    keys = keys.slice(1).split("");

    for (let i = 0; i < keys.length; i++) {
      const key = aliases[keys[i]] || keys[i];

      // if we have a value, it's only for the last key
      if (i === keys.length - 1) {
        options[key] = value;
      } else {
        options[key] = true;
      }
    }
  }

  if (options.help) {
    printHelp(argv[1], config);
    process.exit();
  }

  return options;
}

module.exports = clip;
