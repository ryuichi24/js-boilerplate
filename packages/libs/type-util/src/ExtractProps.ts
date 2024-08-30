import { ExcludeFuncProp } from "./ExcludeFuncProp";

// https://x.com/colinhacks/status/1818047762891506050?s=46&t=q16FsxWaNQpEyTapXycF5A
export type ExtractProps<T> = { [K in keyof T as ExcludeFuncProp<T, K>]: T[K] };
