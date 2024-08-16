const fs = require("fs");
const path = require("path");

// Get the folder path from the command line arguments
const folderPath = process.argv[2];

// Check if folder path is provided
if (!folderPath) {
  console.error("Error: Please provide a path to the folder.");
  process.exit(1);
}

// Resolve the full path and folder name
const fullPath = path.resolve(folderPath);
const folderName = path.basename(fullPath);

// Function to create directories recursively
function createDirectoriesRecursively(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Create the folder structure
createDirectoriesRecursively(fullPath);

// Read the root package.json to get the module name
const rootPackageJsonPath = path.resolve("package.json");
const rootPackageJson = JSON.parse(
  fs.readFileSync(rootPackageJsonPath, "utf8")
);
const moduleName = rootPackageJson.name;

const newModuleName = `@${moduleName}/${folderName}`;

// Create a new package.json file in the target folder
const newPackageJson = {
  name: newModuleName,
  version: "1.0.0",
  description: "",
  scripts: {},
  private: true,
  author: rootPackageJson?.author ?? "",
  license: "MIT",
};

// Write the new package.json to the target folder
const newPackageJsonPath = path.join(fullPath, "package.json");
fs.writeFileSync(
  newPackageJsonPath,
  JSON.stringify(newPackageJson, null, 2),
  "utf8"
);

// Write the new readme file to the target folder
const newReadmePath = path.join(fullPath, "README.md");
fs.writeFileSync(
  newReadmePath,
  `<h1 align="center">${newModuleName}</h1>`,
  "utf8"
);

console.log(`New module: ${newModuleName} has been generated!`);
