import { Config, Return } from "./types";
import { printHelp } from "./help";

/**
 * Normalizes the value received. Undefined is true,
 * "true" and "false" as strings are converted to booleans
 */
function toValue(value: string | null | undefined) {
  if (value == null) {
    // Missing value, we treat as a true
    return true;
  }
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  return value;
}

function mclip<C extends Config>(argv: string[], config?: C): Return<C> {
  if (!argv) {
    throw new Error("Missing argument: process.argv");
  }

  // This is a temporary type to compose the full object
  const options: Record<string, string | boolean | string[]> = {};
  const aliases: Record<string, string> = {};

  if (config) {
    for (const [key, value] of Object.entries(config)) {
      if (value.default) {
        options[key] = value.default;
      }
      if (value.short) {
        aliases[value.short] = key;
      }
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
    const value = toValue(v);

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

  // This cast is fishy, I am open to suggestions
  return options as Return<C>;
}

const p = mclip([], { verbose: { short: "v" } });

p.list;
p.verbose;

export { mclip };
