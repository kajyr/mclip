import { Config } from "./types";
import { printHelp } from "./help";

function clip(argv: string[], config: Config = {}) {
  if (!argv) {
    throw new Error("Missing argument: process.argv");
  }

  const options: Record<string, string | boolean | string[]> = {};
  const aliases: Record<string, string> = {};

  for (const [key, value] of Object.entries(config)) {
    if (value.default) {
      options[key] = value.default;
    }
    if (value.short) {
      aliases[value.short] = key;
    }
  }

  const args = argv.slice(2);
  const list: string[] = [];

  // Finally we can parse the args
  for (const str of args) {
    // If no dash, it's a positional argument
    if (!str.startsWith("-")) {
      list.push(str);
      continue;
    }

    // k can be a single key like --options
    // or a group of short like -Pavuz
    let [k, v] = str.split("=");
    const value = v || true;

    // Double dash: it's a long parameter
    if (str.startsWith("--")) {
      const key = k.slice(2);
      options[key] = value;
      continue;
    }

    // Single dash: it's a group of short parameters
    const keys = k.slice(1).split("");

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

  options.list = list;

  if (options.help) {
    printHelp(argv[1], config);
    process.exit();
  }

  return options;
}

export default clip;
