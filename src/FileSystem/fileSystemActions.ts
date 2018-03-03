import { Uri, workspace } from "vscode";
import socket from "../initSocket";

export default class FileSystemEventHandler {
  constructor() {
  }
  public on_change_file(uri: Uri, mode: string) {
    if (!workspace) {
      return;
    }
    const rootPath: string = workspace.workspaceFolders[0].uri.path;
    const filePath = uri.path.replace(rootPath, '');
    const fileActionObj = { action: 'create', 'filePath': filePath };

    switch (mode) {
      case 'delete':
        fileActionObj.action = 'delete';
        break;
      case 'change':
        fileActionObj.action = 'change';
        break;
    }
    console.log('file system change', fileActionObj);
    socket.emit('file_system_change', JSON.stringify(fileActionObj));
  }
}