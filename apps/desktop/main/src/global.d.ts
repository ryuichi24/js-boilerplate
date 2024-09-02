import { BrowserWindow, Tray } from "electron";
import { ProcessEventEmitter } from "@ts-template/process-event-emitter";

// https://stackoverflow.com/a/53981706
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NAYA_DESKTOP_RENDERER_DEV_SERVER_PORT?: string;
    }
  }
}

declare global {
  /**
   * A main instance of the application window
   */
  var mainWindow: BrowserWindow | null;
  /**
   * A tray object must live in a global scope otherwise the tray icon sometimes disappears
   */
  var tray: Tray | null;
  /**
   * It is for quitting the system properly.
   * This tracks the system being requested to quit by the OS or other ways other than clicking the close button
   */
  var systemQuitState: "NOT_PENDING" | "PENDING" | "APPROVED";
  /**
   *
   */
  var backgroundServer: ProcessEventEmitter | null;
}
