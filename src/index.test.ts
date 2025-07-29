import { mclip } from "./";

describe("Basics", () => {
  test("Args parsing", () => {
    const args = [
      "node",
      "my-cli-script",
      "file",
      "-vf",
      "--option=4",
      "file2",
      "-p",
    ];

    const expected = {
      f: true,
      list: ["file", "file2"],
      option: "4",
      p: true,
      v: true,
    };

    const options = mclip(args);

    expect(options).toEqual(expected);
  });

  test("No arguments", () => {
    const args: string[] = [];

    const expected = { list: [] };

    const options = mclip(args);

    expect(options).toEqual(expected);
  });

  test("Default values", () => {
    const args = ["node", "my-cli-script", "--option=4"];

    const config = {
      foo: { default: "3" },
      option: { default: "value" },
    };

    const expected = {
      list: [],
      option: "4",
      foo: "3",
    };

    const options = mclip(args, config);

    expect(options).toEqual(expected);
  });

  test("No args: throws", () => {
    const something: unknown = null;

    expect(() => {
      mclip(something as string[]);
    }).toThrow();
  });

  test("Long labels with boolean", () => {
    const args = [
      "node",
      "my-cli-script",
      "--foo",
      "--bar=false",
      "--bum=true",
    ];

    const expected = {
      foo: true,
      bar: false,
      bum: true,
      list: [],
    };

    const options = mclip(args);

    expect(options).toEqual(expected);
  });
});

describe("Aliases", () => {
  test("Aliases", () => {
    const args = ["node", "my-cli-script", "-o=value"];

    const config = {
      option: { short: "o" },
    };

    const expected = {
      list: [],
      option: "value",
    };

    const options = mclip(args, config);

    expect(options).toEqual(expected);
  });

  test("Joining aliases and short", () => {
    const args = ["node", "my-cli-script", "-vo=value"];

    const config = {
      option: { short: "o" },
    };

    const expected = {
      list: [],
      option: "value",
      v: true,
    };

    const options = mclip(args, config);

    expect(options).toEqual(expected);
  });
});

describe("Short flags", () => {
  test("Short flags joined", () => {
    const args = ["node", "my-cli-script", "-pvg"];

    const expected = {
      list: [],
      p: true,
      v: true,
      g: true,
    };

    expect(mclip(args)).toEqual(expected);
  });

  test("Short flags separated", () => {
    const args = ["node", "my-cli-script", "-p", "-v", "-g"];

    const expected = {
      list: [],
      p: true,
      v: true,
      g: true,
    };

    expect(mclip(args)).toEqual(expected);
  });

  test("Borderline: joined + value", () => {
    const args = ["node", "my-cli-script", "-pve=foo"];

    const options = mclip(args);

    expect(options.p).toBe(true);
    expect(options.v).toBe(true);
    expect(options.e).toBe("foo");
  });
});

describe("Validators", () => {
  test("Failing validation", () => {
    const args = ["node", "my-cli-script", "--foo=wololo"];

    const config = {
      foo: {
        default: "3",
        validate: (str: string) => !isNaN(Number(str)) && str.trim() !== "",
      },
    };

    expect(() => {
      mclip(args, config);
    }).toThrow('Invalid value for option "foo": wololo');
  });
});
