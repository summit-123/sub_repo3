// APIInterfaces.d.ts

export interface IpcRenderer {
  send(channel: string, ...args: any[]): void;                      //   send: (channel: string, ...args: any[]) => void;
  on(channel: string, listener: (...args: any[]) => void): void;    //   on: (channel: string, listener: Function) => void;
  invoke<T>(channel: string, params?: Record<string, unknown>): Promise<T>;
}

export interface IpcMain {
  on(channel: string, handler: (...args: any[]) => void): void;         //   on: (channel: string, listener: Function) => void;
  handle(channel: string, handler: (...args: any[]) => Promise<any>): void;
}

export interface BrowserWindow {
//   create: (options: { x?: number; y?: number; width?: number; height?: number }) => Promise<void>;
//   unmaximize: () => Promise<void>;
//   isMaximized: () => Promise<any>;  
  loadURL(url: string): void;
  //   setBounds: (bounds: { x: number; y: number; width: number; height: number }) => Promise<void>;
  setBounds(bounds: { x: number; y: number; width: number; height: number }): void;
  close(): void;          //   close: () => Promise<void>;
  minimize(): void;       //   minimize: () => Promise<void>;
  maximize(): void;       //   maximize: () => Promise<void>;
}


export interface Shell {
  openPath(path: string): Promise<string>;      //   openPath: (url: any) => Promise<void>;
  showItemInFolder(path: string): void;
}


export interface Remote {
  getCurrentWindow(): BrowserWindow;
//   dialog: {
//     showSaveDialogSync: () => Promise<any | undefined>;
//     showOpenDialogSync: () => Promise<any[]>;
//   };  
}

// interface Remote {
//   getCurrentWindow: () => {
//     minimize: () => Promise<void>;
//     maximize: () => Promise<void>;
//     unmaximize: () => Promise<void>;
//     isMaximized: () => Promise<any>;
//     close: () => Promise<void>;
//   };
// }

export interface App {
  requestSingleInstanceLock(): boolean;     //   requestSingleInstanceLock: () => Promise<any>;
  quit(): void;                             //   quit: () => Promise<void>;
}

export interface FileReaderAPI {
  readAsDataURL(file: Blob): Promise<string>;
}

export interface FileSystemAPI {
  readFile(path: string): Promise<string>;
  writeFile(path: string, data: string): Promise<void>;
}

export interface PathAPI {
  join(...paths: string[]): string;
  resolve(...paths: string[]): string;
}

