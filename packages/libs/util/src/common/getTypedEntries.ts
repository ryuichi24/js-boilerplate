type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

/**
 * @description
 * A utility wrapper function for `Object.entries` to add static typing to its return value
 *
 * @returns
 * A list of key/values of the enumerable properties of an object with a type
 */
export const getTypedEntries = <T extends object>(obj: T) =>
  Object.entries(obj) as Entries<T>;
