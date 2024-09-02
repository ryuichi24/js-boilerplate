import path from "path";
import { BrowserWindow, app } from "electron";
import { buildESMHelpers } from "@ts-template/esm-helper";
const { require, __dirname } = buildESMHelpers(import.meta.url);
//
const isDev = !app.isPackaged && process.env.NODE_ENV === "development";
const isDebug = process.env.NODE_ENV === "debug";
//
const rendererFilePath = isDebug
  ? require.resolve("@ts-template/desktop-renderer/dist/index.html")
  : path.resolve(__dirname, "..", "desktop-renderer", "index.html");
const preloadScriptPath = path.resolve(__dirname, "preload.mjs");
const rendererDevServerURL = `http://localhost:${3333}`;
//file:///Users/ryuichinishi/dev/personal/projects/ts-template/packages/libs/esm-helper/desktop-renderer/index.html with error: ERR_FILE_NOT_FOUND
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
    await global.mainWindow.loadFile(rendererFilePath);
  }
}

main();

function terminateOnErr(err: Error) {
  //
}

process.on("uncaughtException", terminateOnErr);
