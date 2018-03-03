import { TextDocumentChangeEvent } from "vscode";
import socket from "../initSocket";

export default class WorkspaceEventHandler {

  constructor() {
  }
  public handleEvent(event: any) {
    console.log(event);
  }
  public fileChangeEvent(event: TextDocumentChangeEvent) {
    socket.emit('change_document', JSON.stringify(event));
  }
}