import fs from "fs";
import { SeedScriptGenerator } from "./SeedScriptGenerator.js";

export function generateQueries(
  generators: Record<string, SeedScriptGenerator<any>>
) {
  const seedQueries = Object.values(generators)
    .filter((gen) => gen.hasRows())
    .map((gen) => gen.saveAsString());
  const seedScript = seedQueries.join("\n--> statement-breakpoint\n");
  fs.writeFileSync("./dist/seed.sql", seedScript, { encoding: "utf8" });
}
