export type ConfigOption = {
  default?: string | boolean;
  description?: string;
  short?: string;
};
export type Config = Record<string, ConfigOption>;

type ExtractType<Type> = Type extends boolean
  ? boolean
  : Type extends string
  ? string
  : string | boolean | undefined;

/**
 * Return type for a given Config
 *
 * Note that if the default for a given prop is not set
 * the type will be string | boolean | undefined meaning that we don't know, it might also not be there.
 *
 * If the default is set, the key will always be there, and we expect it to have the
 * same type of the default provided
 */
export type Return<T extends Config> = {
  [K in keyof T]: ExtractType<T[K]["default"]>;
} & { list: string[]; help?: boolean };
