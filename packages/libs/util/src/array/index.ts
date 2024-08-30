export function removeAt<TData>(at: number, items: TData[]) {
  const copied = [...items];
  const [removed] = copied.splice(at, 1);
  return {
    removedList: copied,
    removed,
  };
}

export function insertAt<TData>(at: number, items: TData[], item: TData) {
  const copied = [...items];
  copied.splice(at, 0, item);
  return {
    insertedList: copied,
    inserted: item,
  };
}

export function swap<TItem>(array: TItem[], indexA: number, indexB: number) {
  if (indexA < 0 || indexA >= array.length || indexB < 0 || indexB >= array.length) {
    console.error("Invalid indices");
    return;
  }

  const temp = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = temp;

  return array;
}

export function toSwapped<TData>(array: TData[], from: number, to: number) {
  const newArray = array.slice();
  newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0]);

  return newArray;
}

export function isArray<T extends object>(value: T | T[]): value is Array<T> {
  if (Object.hasOwn(value, "length")) return true;
  return false;
}
