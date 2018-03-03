
import socket from './initSocket';

class Socket {
  private _socket: SocketIOClient.Socket;
  constructor() {
    this._socket = socket;
  }

  public emitEvent(event: string, data: object) {
    this._socket.emit(event, data);
  }
}

export default Socket;