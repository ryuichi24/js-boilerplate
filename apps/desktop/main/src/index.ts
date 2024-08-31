import path from "path";
import { BrowserWindow, app } from "electron";
// support common js features
import { createRequire } from "module";
import url from "url";
const require = createRequire(import.meta.url);
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
//
const preloadScriptPath = path.resolve(__dirname, "preload.mjs");
const rendererDevServerURL = `http://localhost:${3333}`;

const isDev = true;

global.mainWindow = null;

async function main() {
  await app.whenReady();

  global.mainWindow = new BrowserWindow({
    minWidth: 1408,
    minHeight: 848,
    width: 1408,
    height: 848 + (isDev ? 630 : 0),
    resizable: isDev,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // https://developer.mamezou-tech.com/blogs/2022/08/03/electron-renderer-process-sandboxed/
      sandbox: false,
      preload: preloadScriptPath,
      additionalArguments: [],
    },
  });

  if (isDev) {
    global.mainWindow.webContents.openDevTools({
      mode: "bottom",
    });
    await global.mainWindow.loadURL(rendererDevServerURL);
  } else {
    await global.mainWindow.loadFile("");
  }
}

main();

function terminateOnErr(err: Error) {
  //
}

process.on("uncaughtException", terminateOnErr);
