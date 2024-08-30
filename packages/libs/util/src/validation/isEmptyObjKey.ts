export function isEmptyObjKey(obj: object): boolean {
  return Object.values(obj || {}).every((val) => !val);
}
