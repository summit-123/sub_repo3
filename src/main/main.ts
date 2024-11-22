// import { 
// 	app, 
// 	BrowserWindow, 
// 	ipcMain, 
// 	nativeTheme 
// } from "electron";

import { MockAPI } from '../MockAPI';
import {	IpcRenderer,	IpcMain,	BrowserWindow,	Shell,	Remote,	App,	
			FileReaderAPI,	FileSystemAPI,	PathAPI
  } from "../APIInterfaces";

const isDev = process.env.NODE_ENV === "development";

// Use mocks by default
// let ipcRenderer: IpcRenderer = MockAPI.ipcRenderer;
let ipcMain: IpcMain = MockAPI.ipcMain;
let browserWindow: BrowserWindow = MockAPI.browserWindow;
// let shell: Shell = MockAPI.shell;

let mainWindow: Electron.BrowserWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		show: isDev,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
			spellcheck: false
		}
	});

	mainWindow.loadFile(`${__dirname}/index.html`);

	if (isDev) {
		mainWindow.webContents.openDevTools();
	} else {
		mainWindow.setMenu(null);
		mainWindow.on("ready-to-show", () => {
			mainWindow.show();
		});
	}

	mainWindow.on("close", (e: Event) => {
		if (mainWindow) {
			e.preventDefault();
			mainWindow.hide();
			mainWindow.webContents.send("app-close");
		}
	});

	mainWindow.webContents.on('will-navigate', (e, url) => {
		e.preventDefault()
		const newWindow = new BrowserWindow();
		newWindow.setMenu(null);
		newWindow.loadURL(url);
	})
}

const gotTheLock = MockAPI.app.requestSingleInstanceLock();

if (!gotTheLock) {
	MockAPI.app.quit();
} else {
	MockAPI.app.on("second-instance", () => {
		if (mainWindow) {
			if (mainWindow.isMinimized()) {
				mainWindow.restore();
			}
			mainWindow.focus();
		}
	});

	MockAPI.app.on("ready", createWindow);

	MockAPI.app.on("activate", () => {
		if (mainWindow === null) {
			createWindow();
		}
	});

	ipcMain.on('quit', () => {
		mainWindow = null;
		MockAPI.app.quit();
	});
}