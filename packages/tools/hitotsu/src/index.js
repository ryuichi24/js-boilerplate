#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { program } from "commander";
import { PackageJSON } from "@js-boilerplate/util/package-json";

program
  .command("add <pathToModule>")
  .description("Add a new module to the workspace.")
  .option("-cjs, --commonjs", "Commonjs flag", false)
  .option(
    "-t, --moduletype <moduleType>",
    "type of module (app, cli, lib, empty)",
    "lib"
  )
  .action((pathToModule, options) => {
    const fullPathToNewModule = path.resolve(pathToModule);

    // make a new module directory recursively
    if (!fs.existsSync(fullPathToNewModule)) {
      fs.mkdirSync(fullPathToNewModule, { recursive: true });
    }

    const newModuleName = path.basename(fullPathToNewModule);

    // get root package.json
    const rootPackageJsonPath = path.resolve("package.json");
    const rootPackageJson = JSON.parse(
      fs.readFileSync(rootPackageJsonPath, "utf8")
    );
    const rootProjectName = rootPackageJson.name;

    const fullNewModuleName = `@${rootProjectName}/${newModuleName}`;

    // make package.json file
    const packageJson = new PackageJSON({
      name: fullNewModuleName,
      author: rootPackageJson.author,
      type: options.commonjs ? "commonjs" : "module",
    });

    if (options.moduleType === "app") {
      //
    }

    if (options.moduleType === "cli") {
      //
    }

    if (options.moduleType === "lib") {
      //
    }

    if (options.moduleType === "empty") {
      //
    }

    const newPackageJsonPath = path.join(fullPathToNewModule, "package.json");
    fs.writeFileSync(newPackageJsonPath, packageJson.toJson(), "utf8");

    // make README file
    const newReadmePath = path.join(fullPathToNewModule, "README.md");
    fs.writeFileSync(
      newReadmePath,
      `<h1 align="center">${fullNewModuleName}</h1>`,
      "utf8"
    );
  });

program.parse(process.argv);
