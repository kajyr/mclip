function fillSpace(word, length) {
  const spaces = " ".repeat(length - word.length);
  return `${word}${spaces}`;
}

function printColumns(grid) {
  const columnWidths = grid.reduce((acc, row) => {
    for (let i = 0; i < row.length; i++) {
      acc[i] = Math.max(acc[i], row[i].length);
    }
    return acc;
  }, new Array(grid[0].length).fill(0));

  for (const row of grid) {
    let str = "  ";
    for (const cell of row) {
      str = str + fillSpace(cell, columnWidths[row.indexOf(cell)]) + "  ";
    }
    console.log(str);
  }
}

function renderParam(key) {
  const dashes = key.length > 1 ? "--" : "-";
  return `${dashes}${key}`;
}

function getScriptName(str) {
  const a = str.split("/");
  return a[a.length - 1];
}

function printHelp(scriptName, config) {
  console.log(`Usage: ${getScriptName(scriptName)} [options] [arguments]`);
  const entries = Object.entries(config);
  if (entries.length === 0) {
    return;
  }

  console.log("Options:");
  const opts = [];
  for (const [key, value] of entries) {
    let flags = renderParam(key);
    if (value.short) {
      flags = `${flags}, ${renderParam(value.short)}`;
    }
    let description = value.description || "";
    let defaults = value.default ? `Default: ${value.default}` : "";

    opts.push([flags, description, defaults]);
  }
  printColumns(opts);
}

module.exports = printHelp;
