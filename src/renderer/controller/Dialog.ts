// import { remote } from "electron";

import { Remote } from "../../APIInterfaces"; 
import { MockAPI } from "../../MockAPI";

class Dialog {
    public saveFile(name: string, extensions: string[], options?: {title?: string, filename?: string}): string | undefined {
        return MockAPI.remote.dialog.showSaveDialogSync(MockAPI.remote.getCurrentWindow(), {
            title: options?.title,
            defaultPath: options?.filename,
            filters: [{ name: name, extensions: extensions }]
        })
    }

    public openFile(name: string, extensions: string[]): string | undefined {
        const paths = MockAPI.remote.dialog.showOpenDialogSync(MockAPI.remote.getCurrentWindow(), {
            filters: [{ name: name, extensions: extensions }],
            properties: ['openFile']
        });
        
        if (paths === undefined) {
            return undefined;
        }

        return paths[0];
    }

    public openDirectory(): string | undefined {
        const paths = MockAPI.remote.dialog.showOpenDialogSync(MockAPI.remote.getCurrentWindow(), {
            properties: ['openDirectory', 'createDirectory']
        });
        
        if (paths === undefined) {
            return undefined;
        }

        return paths[0];
    }
}

export default new Dialog();