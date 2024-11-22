// MockAPI.ts
import { appWindow } from '@tauri-apps/api/window';
import { invoke } from '@tauri-apps/api/tauri';
import { IpcRenderer, IpcMain, BrowserWindow, Shell, Remote, App, FileReaderAPI, FileSystemAPI, PathAPI } from "./APIInterfaces";

const tauri = window.__TAURI__;


// Mock Implementations
const mockApp: App = {
  requestSingleInstanceLock: async (): Promise<boolean> => {
    return true; // Mock behavior for single-instance lock
  },
  quit: async (): Promise<void> => {
    await invoke('quit');
  },
};

const mockIpcMain: IpcMain = {
  on: (channel: string, listener: Function): void => {
    console.warn(`ipcMain.on is mocked for channel: ${channel}`);
  },
};

const mockIpcRenderer: IpcRenderer = {
  send: (channel: string, ...args: any[]): void => {
    console.warn(`ipcRenderer.send is mocked for channel: ${channel}`);
  },
  on: (channel: string, listener: Function): void => {
    console.warn(`ipcRenderer.on is mocked for channel: ${channel}`);
  },
};

const mockBrowserWindow: BrowserWindow = {
  // create: async (options): Promise<void> => {
  //   console.warn(`browserWindow.create is partially mocked. Tauri doesn't support dynamic window creation.`);
  // },
  minimize: async (): Promise<void> => {
    await appWindow.minimize();
  },
  maximize: async (): Promise<void> => {
    await appWindow.maximize();
  },
  // unmaximize: async (): Promise<void> => {
  //   await appWindow.unmaximize();
  // },
  // isMaximized: async (): Promise<boolean> => {
  //   return await appWindow.isMaximized();
  // },
  close: async (): Promise<void> => {
    await appWindow.close();
  },
  setBounds: async (bounds): Promise<void> => {
    await appWindow.setBounds(bounds);
  },
};

const mockRemote: Remote = {
  getCurrentWindow: () => ({
    minimize: async () => await appWindow.minimize(),
    maximize: async () => await appWindow.maximize(),
    // unmaximize: async () => await appWindow.unmaximize(),
    // isMaximized: async (): Promise<boolean> => await appWindow.isMaximized(),
    close: async () => await appWindow.close(),
  }),
  dialog: {
    showSaveDialogSync: async (): Promise<string | undefined> => {
      return await invoke('save_dialog');
    },
    showOpenDialogSync: async (): Promise<string[]> => {
      return [await invoke('open_dialog')];
    },
  },
};

const mockShell: Shell = {
  openPath: async (url: string) => {
    await invoke('load_url', { url });
  },
};

// Exporting MockAPI with typed mock objects
export const MockAPI = {
  app: mockApp,
  ipcMain: mockIpcMain,
  ipcRenderer: mockIpcRenderer,
  browserWindow: mockBrowserWindow,
  remote: mockRemote,
  shell: mockShell,
};
