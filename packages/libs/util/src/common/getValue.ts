export function getValue<T, K extends keyof T>(obj: T | undefined, key: K | undefined | null): T[K] | undefined {
  return key && obj ? obj[key] : undefined;
}
