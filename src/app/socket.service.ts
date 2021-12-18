import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: Socket
  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('connect', function() {
      console.log('Connected');
    });
  }

  reconnect() {
    if(this.socket.disconnected) {
      this.socket.close();
      setTimeout(() => {
        this.socket = io(environment.SOCKET_ENDPOINT)
      }, 20000)
    }
  }

  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
  }
}
