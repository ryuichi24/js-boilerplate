#!/usr/bin/env node

import fs from "fs";
import { program } from "commander";

function renameItem(oldPath, newPath) {
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error(`Error renaming ${oldPath} to ${newPath}:`, err.message);
    } else {
      console.log(`Renamed ${oldPath} to ${newPath}`);
    }
  });
}

function makeItem(name, options) {
  if (options.type === "dir") {
    fs.mkdir(name, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error creating directory ${name}:`, err.message);
      } else {
        console.log(`Directory ${name} created successfully`);
      }
    });
  } else {
    // Create a file
    const content = options.content || "";
    fs.writeFile(name, content, (err) => {
      if (err) {
        console.error(`Error creating file ${name}:`, err.message);
      } else {
        console.log(`File ${name} created successfully`);
      }
    });
  }
}

program
  .command("rename <oldPath> <newPath>")
  .description("Rename a file or folder")
  .action((oldPath, newPath) => {
    renameItem(oldPath, newPath);
  });

program
  .command("make <name>")
  .description("Make a file with content or an empty file/directory")
  .option("-c, --content <content>", "Content to write to the file")
  .option("-t, --type <type>", "Type of item to create (file or dir)", "file")
  .action((name, options) => {
    makeItem(name, options);
  });

program.parse(process.argv);
