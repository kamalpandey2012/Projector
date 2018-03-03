'use strict';
import FileSystemEventHandler from './fileSystemActions';
import { Disposable, workspace, Uri } from 'vscode';

export default class FileSystemController {
  private _eventHandler: FileSystemEventHandler;
  private _disposable: Disposable;
  constructor(eHandler: FileSystemEventHandler) {
    this._eventHandler = eHandler;

    const fileSystemWatcher = workspace.createFileSystemWatcher('**/*.{ts,js}');
    console.log('file system watcher', fileSystemWatcher);
    let subscriptions: Disposable[] = [];
    fileSystemWatcher.onDidCreate(this._on_create, this, subscriptions);
    fileSystemWatcher.onDidChange(this._on_change, this, subscriptions);
    fileSystemWatcher.onDidDelete(this._on_delete, this, subscriptions);
    this._disposable = Disposable.from(...subscriptions);
  }
  dispose() {
    this._disposable.dispose();
  }
  private _on_create(event: Uri) {
    console.log('create event', event);
    this._eventHandler.on_change_file(event, 'create');
  }
  private _on_delete(event: Uri) {
    this._eventHandler.on_change_file(event, 'delete');
  }
  private _on_change(event: Uri) {
    this._eventHandler.on_change_file(event, 'change');
  }
}