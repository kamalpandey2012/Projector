
import { window, Disposable } from "vscode";
import WindowActions from './windowActions';

export default class WindowController {
  private _disposable: Disposable;
  private _windowActions: WindowActions;

  constructor(windowActions: WindowActions) {
    this._windowActions = windowActions;
    let subscriptions: Disposable[] = [];
    window.onDidChangeActiveTextEditor(this._onActiveWindowChangeEvent, this, subscriptions);
    window.onDidChangeTextEditorSelection(this._onTextEditorSelectionChange, this, subscriptions);
    this._disposable = Disposable.from(...subscriptions);
  }
  dispose() {
    this._disposable.dispose();
  }
  private _onActiveWindowChangeEvent() {
    this._windowActions.getActiveWindow(true);
  }
  private _onTextEditorSelectionChange() {
    this._windowActions.onTextEditorSelectionChange();
  }
}