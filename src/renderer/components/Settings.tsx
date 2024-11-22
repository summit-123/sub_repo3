// import { shell } from 'electron';

import { Shell } from "../../APIInterfaces"; 
import { MockAPI } from "../../MockAPI";

import * as React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import db from '../model/Database';
import cfg from '../model/Config';
import dialog from '../controller/Dialog';

import Button from './Button';
import ButtonNavLink from './ButtonNavLink';

const Settings = (props: ISettingsProps) => {
    const match = useRouteMatch();

    return (
        <>
            <aside className="col">
                <ButtonNavLink name="General" icon="build" to={`${match.path}/general`} className="sidebar" />
                <ButtonNavLink name="Database" icon="backup" to={`${match.path}/database`} className="sidebar" />
            </aside>

            <main>
                <Switch>
                    <Route exact path={match.path}>
                        <Redirect to={`${match.path}/general`}/>
                    </Route>
                    <Route path={`${match.path}/general`}>
                        <SettingsGeneral onThemeChange={props.onThemeChange} />
                    </Route>
                    <Route path={`${match.path}/database`}>
                        <SettingsDatabase />
                    </Route>
                </Switch>
            </main>
        </>
    );
}

interface ISettingsProps {
    onThemeChange(): void
}

const SettingsGeneral = (props: {onThemeChange(): void}) => {
    const onThemeSelect = (value: string): void => {
        cfg.setTheme(value);
        props.onThemeChange();
    }

    return (
        <>
            <h1>General</h1>

            <h3>Theme</h3>
            <p>Apply a theme for the application.</p>
            <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onThemeSelect(e.target.value)} defaultValue={cfg.getTheme()}>
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
        </>
    );
}

const SettingsDatabase = () => {
    const [dbPath, setDbPath] = React.useState<string>(cfg.getDatabasePath());
    
    const openDatabaseDir = () => {
        MockAPI.shell.openPath(cfg.getDatabaseDir());
    }

    const changeDatabasePath = () => {
        const newPath = dialog.saveFile('lazycard', ['lazycard']);
        if (newPath === undefined) {
            return;
        }

        cfg.setDatabasePath(newPath);
        setDbPath(newPath);
    }

    const openBackupDir = () => {
        MockAPI.shell.openPath(cfg.getBackupDir());
    }

    const changeBackupAmount = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        let amount = Number(target.value);
        if (amount > 100) amount = 100;
        if (amount < 1) amount = 1;
        target.value = amount.toString();
        cfg.setBackupAmount(amount);
    }

    const restoreDatabase = () => {
        const dbFile = dialog.openFile('lazycard', ['lazycard']);
        if (dbFile === undefined) {
            return;
        }

        db.restore(dbFile);
    }

    return (
        <>
            <h1>Database</h1>

            <h3>Location</h3>
            <p>The location of your database file.</p>
            <p><label>{dbPath}</label></p>
            <section className="row space-fixed">
                <Button name="Open" icon="folder_open" action={openDatabaseDir} />
                <Button name="Change" icon="edit" action={changeDatabasePath} />
            </section>

            <h3>Backups</h3>
            <p>The amount of backups before old ones are removed.</p>
            <section className="row space-fixed">
                <Button name="Open" icon="folder_open" action={openBackupDir} />
                <input
                    type="number"
                    defaultValue={cfg.getBackupAmount()}
                    min="1"
                    max="100"
                    onInput={(e: React.FormEvent<HTMLInputElement>) => changeBackupAmount(e)}
                />
            </section>

            <h3>Restore</h3>
            <p>Restore your database from a local file.</p>
            <Button name="Restore" icon="settings_backup_restore" action={restoreDatabase} />   
        </>
    );
}

export default Settings;