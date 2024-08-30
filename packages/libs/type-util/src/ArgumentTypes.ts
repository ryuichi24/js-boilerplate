/**
 * @description
 * A utility custom type to extract argument type of the provided function
 */
export type ArgumentTypes<F extends (...args: any[]) => any> = F extends (
  ...args: infer Args
) => any
  ? Args
  : never;
