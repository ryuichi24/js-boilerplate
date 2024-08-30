export function isListOfString(item: any): item is string[] {
  return Array.isArray(item) && item.every((element) => typeof element === "string");
}
