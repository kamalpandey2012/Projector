'use strict';

import { window, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument, workspace, FileSystemWatcher } from 'vscode';
import { config } from './socketConfig';
import socket from './initSocket';
import WindowController from './window/windowController';
import WindowActions from './window/windowActions';
// import WordCounter from './wordCounter';
// import WordCounterController from './wordCounterController';
import WorkspaceController from './workspace/workspaceController';
import WorkspaceEventHandler from './workspace/workspaceEventHandler';
import FileSystemEventHandler from './FileSystem/fileSystemActions';
import FileSystemController from './FileSystem/fileSystemController';

export function activate(context: ExtensionContext) {
    console.log('Congratulations, your extension "projector" is now active!');
    let disposable = commands.registerCommand('extension.registerProjector', () => {
        socket.on('connection', function () {
            console.log('connection established');
        });

        setInterval(function () {
            const timeNow = Date.now();
            // console.log('time now ', timeNow);
            socket.emit('update_time', timeNow);
        }, 15000);
    });
    const windowActions = new WindowActions();
    let windowController = new WindowController(windowActions);
    const workspaceEventHandler = new WorkspaceEventHandler();
    let workspaceController = new WorkspaceController(workspaceEventHandler);
    const fileSystemEventHandler = new FileSystemEventHandler();
    let fileSystemController = new FileSystemController(fileSystemEventHandler);

    context.subscriptions.push(fileSystemController);
    context.subscriptions.push(windowController);
    context.subscriptions.push(workspaceController);
    context.subscriptions.push(disposable);
}

export function deactivate() {
}