import { window, workspace } from "vscode";
import socket from '../initSocket';

class FileData {
  private fileName: string;
  private root: string;
  constructor(fileName: string, root: string) {
    this.fileName = fileName;
    this.root = root;
  }
}

export default class WindowActions {
  constructor() { }
  public getActiveWindow(fromOpen: boolean | undefined) {
    const editor = window.activeTextEditor;
    if (!editor) {
      return;
    }
    if (!fromOpen) {
      return;
    }

    const fileName = editor.document.fileName;
    if (!workspace.workspaceFolders) { return; }
    const rootPath = workspace.workspaceFolders[0].uri.path;
    const fileData = new FileData(fileName, rootPath);
    socket.emit('load_file_to_editor', JSON.stringify(fileData));
    console.log('document', editor.document, workspace.workspaceFolders);
  }
  public onTextEditorSelectionChange() {
    const editor = window.activeTextEditor;
    if (!editor) {
      return;
    }
    socket.emit('selection_change', JSON.stringify(editor.selection));
  }
}