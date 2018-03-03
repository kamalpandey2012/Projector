'use strict';

import WorkspaceEventHandler from "./workspaceEventHandler";
import { Disposable, workspace, TextDocument, TextDocumentChangeEvent } from "vscode";

export default class WorkspaceController {
  private _eventHandler: WorkspaceEventHandler;
  private _workspace_name: string | undefined;
  private _root_path: string | undefined;
  private _workspace_folders: object | undefined;
  private _disposable: Disposable;

  constructor(eHandler: WorkspaceEventHandler) {
    this._workspace_name = workspace.name;
    this._root_path = workspace.rootPath;
    this._eventHandler = eHandler;
    this._workspace_folders = workspace.workspaceFolders;
    let subscriptions: Disposable[] = [];
    workspace.onDidChangeTextDocument(this._on_document_change, this, subscriptions);
    this._disposable = Disposable.from(...subscriptions);
  }

  dispose() {
    this._disposable.dispose();
  }

  private _on_document_change(event: TextDocumentChangeEvent) {
    this._eventHandler.fileChangeEvent(event);
  }


}