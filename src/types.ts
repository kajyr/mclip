export type ConfigOption = {
  default?: string | boolean;
  description?: string;
  short?: string;
};
export type Config = Record<string, ConfigOption>;
