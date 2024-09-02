import fs from "fs";

export function rename(oldPath: string, newPath: string) {
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error(`Error renaming ${oldPath} to ${newPath}:`, err.message);
    } else {
      console.log(`Renamed ${oldPath} to ${newPath}`);
    }
  });
}

export function makeDir(
  name: string,
  options: { recursive?: boolean } = { recursive: true }
) {
  const recursive = options.recursive;
  fs.mkdir(name, { recursive }, (err) => {
    if (err) {
      console.error(`Error creating directory ${name}:`, err.message);
    } else {
      console.log(`Directory ${name} created successfully`);
    }
  });
}

export function makeFile(
  name: string,
  options: { content: string } = { content: "" }
) {
  const content = options.content;
  fs.writeFile(name, content, (err) => {
    if (err) {
      console.error(`Error creating file ${name}:`, err.message);
    } else {
      console.log(`File ${name} created successfully`);
    }
  });
}

export function fileExist(path: string) {
  if (!fs.existsSync(path)) {
    console.log(`The item (${path}) does not exist.`);
    return false;
  }

  if (!fs.lstatSync(path).isFile()) {
    console.log(`The item (${path}) is not file.`);
    return false;
  }

  return true;
}

export function dirExist(path: string) {
  if (!fs.existsSync(path)) {
    console.log(`The item (${path}) does not exist.`);
    return false;
  }

  if (!fs.lstatSync(path).isDirectory()) {
    console.log(`The item (${path}) is not directory.`);
    return false;
  }

  return true;
}

export function makeFileIfExist(
  path: string,
  options: { content: string } = { content: "" }
) {
  if (fileExist(path)) return;
  makeFile(path, options);
}

export function makeDirIfExist(
  path: string,
  options: { recursive?: boolean } = { recursive: true }
) {
  if (dirExist(path)) return;
  makeDir(path, options);
}

export function cpDir(
  from: string,
  to: string,
  options: { recursive?: boolean } = { recursive: true }
) {
  fs.cpSync(from, to, options);
}

export function cpDirIfExist(
  from: string,
  to: string,
  options: { recursive?: boolean } = { recursive: true }
) {
  if (!dirExist(from)) return;
  fs.cpSync(from, to, options);
}
