function clip(argv) {
  if (!argv) {
    throw new Error("Missing argument: process.argv");
  }
  const args = argv.slice(2);
  const options = { list: [] };

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

  return options;
}

module.exports = clip;
