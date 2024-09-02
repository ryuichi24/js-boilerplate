// support common js features
import { createRequire } from "module";
import url from "url";

/**
 *
 * @returns ESM Helpers
 */
export function buildESMHelpers(moduleUrl: string) {
  const require = createRequire(moduleUrl);
  const __filename = url.fileURLToPath(moduleUrl);
  const __dirname = url.fileURLToPath(new URL(".", moduleUrl));
  return { require, __dirname, __filename } as const;
}
