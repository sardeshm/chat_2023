import { Component } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-join-chat',
  templateUrl: './join-chat.component.html',
  styleUrls: ['./join-chat.component.css'],
})
export class JoinChatComponent {
  user!: string;
  room!: string;
  join: any;

  constructor(private _chatService: ChatService, private router: Router) {}

  joinRoomAction() {
    this._chatService.joinRoom({ user: this.user, room: this.room });

    this.router.navigateByUrl('/' + this.room, {
      state: { userParam: this.user, roomParam: this.room },
    });
  }
}
