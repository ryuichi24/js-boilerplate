type Keys<T> = (keyof T)[];

export const getTypesKeys = <T extends object>(obj: T) => Object.keys(obj) as Keys<T>;
