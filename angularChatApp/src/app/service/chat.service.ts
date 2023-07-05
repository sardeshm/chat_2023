import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketio from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket = socketio.io('http://localhost:3000');
  private userRoomArray: Array<{ userName: string; roomName: string }> = [];
  constructor() {}

  joinRoom(data: any) {
    this.userRoomArray.push({ userName: data.user, roomName: data.room });

    console.log('Hello world!', data);
    this.socket.emit('join', data);
  }

  /**getRoomUsers(roomName: string) {
    this.userRoomArray.filter((data) => data.roomName === roomName);
  }**/

  newUserJoined() {
    let observable = new Observable<{
      user: String;
      room: String;
      message: String;
      joinedUserList: [];
    }>((observer) => {
      this.socket.on('new user joined', (data: any) => {
        console.log('New user joined to chat : ', data);
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    return observable;
  }

  leaveRoom(data: any) {
    this.socket.emit('leave', data);
  }

  userLeftRoom() {
    let observable = new Observable<{ user: String; message: String }>(
      (observer) => {
        this.socket.on('left room', (data: any) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );

    return observable;
  }
  sendMessage(data: any) {
    console.log('How are you: ', data);
    this.socket.emit('message', data);
  }

  newMessageReceived() {
    let observable = new Observable<{ user: String; message: String }>(
      (observer) => {
        this.socket.on('new message', (data: any) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );

    return observable;
  }
}
