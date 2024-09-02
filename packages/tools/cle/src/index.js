import fs from "fs";
import { program } from "commander";
import { searchAll } from "@js-boilerplate/file-system";

// parsers
function list(val) {
  return val.split(",");
}

program
  .command("clean <folder>")
  .description("Clean up files and folder.")
  .option("-e, --entries <entries>", "a list of entries", list)
  .action((targetFolder, options) => {
    const deleteEntries = options.entries;
    const { foundDirs, foundFiles } = searchAll(targetFolder, deleteEntries);
    [...deleteEntries, foundDirs, foundFiles].flat().forEach((item) => {
      fs.rmSync(item, { recursive: true, force: true });
      console.log(`Deleted: ${item}`);
    });
  });

program.parse(process.argv);
