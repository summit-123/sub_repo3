// import { remote } from "electron";

import { Remote } from "../../APIInterfaces"; 
import { MockAPI } from "../../MockAPI";

import * as React from 'react';

import cfg from '../model/Config';

import Button from './Button';

const Header = () => {
    const [isMaximized, setIsMaximized] = React.useState<boolean>(MockAPI.remote.getCurrentWindow().isMaximized());

    const resize = () => {
        if (isMaximized) MockAPI.remote.getCurrentWindow().unmaximize()
        else MockAPI.remote.getCurrentWindow().maximize();
    }

    React.useEffect(() => {
        MockAPI.remote.getCurrentWindow().on('maximize', () => setIsMaximized(true))
        MockAPI.remote.getCurrentWindow().on('unmaximize', () => setIsMaximized(false))
    }, []);

    return (
        <header>
            <div className="titlebar-resize"></div>
            <div className="titlebar-logo row col-center">
                <img src={`${cfg.getStaticDir()}/icon.png`} />
                <label>Lazycard</label>
            </div>
            <div className="titlebar-buttons row">
                <Button icon="remove" action={MockAPI.remote.getCurrentWindow().minimize} className="titlebar" />
                <Button icon={isMaximized ? "fullscreen_exit" : "fullscreen"} action={resize} className="titlebar" />
                <Button icon="close" action={MockAPI.remote.getCurrentWindow().close} className="titlebar" />
            </div>
        </header>
    );
}

export default Header;