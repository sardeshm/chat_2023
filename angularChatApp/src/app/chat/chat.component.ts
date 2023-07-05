import { Component } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  userRoomParam: { userParam: string; roomParam: string } = {
    userParam: '',
    roomParam: '',
  };
  messageText!: string;
  userArray: Array<string> = [];
  messageArray: Array<{ user: string; room: string; message: string }> = [];

  constructor(private _chatService: ChatService, private router: Router) {
    this._chatService.newUserJoined().subscribe((data: any) => {
      console.log('Someone is joined: ', data);
      var unique = [];
      for (var i = 0; i < data.joinedUserList.length; i++) {
        var found = false;

        for (var j = 0; j < this.userArray.length; j++) {
          // j < is missed;
          if (this.userArray[i] == data.joinedUserList[j]) {
            found = true;
            break;
          }
        }
        if (found == false) {
          unique.push(data.joinedUserList[i]);
        }
      }
      console.log('unique message', unique);
      this.userArray.push(...unique);
      this.messageArray.push(data);
    });

    this._chatService.userLeftRoom().subscribe((data: any) => {
      console.log('userLeftRoom 11: ', data);
      this.messageArray.push(data);
      this.userArray = this.userArray.filter((item) => item !== data.user);
      if (data.user === this.userRoomParam.userParam) {
        this.router.navigate(['']);
      }
    });

    this._chatService.newMessageReceived().subscribe((data: any) => {
      console.log('newMessageReceived : ', data);
      this.messageArray.push(data);
    });
  }

  ngOnInit() {
    console.log('History : ', history.state);
    this.userRoomParam.userParam = history.state.userParam;
    this.userRoomParam.roomParam = history.state.roomParam;
  }

  getRoomUsers() {
    let filterArray = this.messageArray.filter(
      (data) => data.room === this.userRoomParam.roomParam
    );

    for (var user of filterArray) {
      this.userArray.push(user.user);
    }
    console.log('bsbdcjdsbc: ', this.userArray);
    console.log('XCJHGJBJ : ', this.messageArray);
    return this.userArray;
  }
  leaveRoom() {
    this._chatService.leaveRoom({
      user: this.userRoomParam.userParam,
      room: this.userRoomParam.roomParam,
    });
  }

  sendMessage() {
    this._chatService.sendMessage({
      user: this.userRoomParam.userParam,
      room: this.userRoomParam.roomParam,
      message: this.messageText,
      messageText: (this.messageText = ''),
    });
  }
}
