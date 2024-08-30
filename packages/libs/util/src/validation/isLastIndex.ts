export function isLastIndex<T>(index: number, list: T[]) {
  const lastIndex = list.length - 1;
  if (!(0 <= index && index <= lastIndex)) {
    throw new Error("The index is out of the provided list index range.");
  }
  return lastIndex === index;
}
