export function omit<TObj extends object, TObjKeys extends (keyof TObj)[]>(
  obj: TObj,
  keys: TObjKeys
) {
  const result = {} as Omit<TObj, TObjKeys[number]>;

  Object.keys(obj).forEach((key) => {
    const objKey = key as keyof TObj;
    if (!keys.includes(objKey)) {
      // @ts-ignore
      const value = obj[objKey];
      // @ts-ignore
      result[objKey] = value;
    }
  });

  return result;
}
