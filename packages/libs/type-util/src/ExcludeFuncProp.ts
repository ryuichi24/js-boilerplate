import { AnyFunc } from "./AnyFunc";

export type ExcludeFuncProp<T, K extends keyof T> = T[K] extends AnyFunc
  ? never
  : K;
