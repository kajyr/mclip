function printHelp(scriptName, info, defaults) {
  console.log(`Usage: ${scriptName} [options] [arguments]`);
  const entries = Object.entries(info);
  if (entries.length === 0) {
    return;
  }

  console.log("Options:");
  for (const [key, value] of entries) {
    const dashes = key.length > 1 ? "--" : " -";
    const def = !!defaults[key] ? `[default: ${defaults[key]}]` : "";
    console.log(`  ${dashes}${key}\t${value || ""}\t${def}`);
  }
}

function clip(argv, defaults = {}, help = {}) {
  if (!argv) {
    throw new Error("Missing argument: process.argv");
  }
  const args = argv.slice(2);
  const options = { list: [], ...defaults };

  for (const str of args) {
    if (str.startsWith("--")) {
      const [key, value] = str.slice(2).split("=");
      options[key] = value || true;
      continue;
    }

    if (str.startsWith("-")) {
      const keys = str.slice(1).split("");
      for (const key of keys) {
        options[key] = true;
      }
      continue;
    }

    options.list.push(str);
  }

  if (options.help) {
    printHelp(argv[1], help, defaults);
    process.exit();
  }

  return options;
}

module.exports = clip;
