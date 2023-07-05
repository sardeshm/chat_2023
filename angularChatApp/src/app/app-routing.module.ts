import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { JoinChatComponent } from './join-chat/join-chat.component';

const routes: Routes = [
  { path: '', component: JoinChatComponent },
  { path: 'join-chat', component: JoinChatComponent },
  { path: 'German', component: ChatComponent },
  { path: 'English', component: ChatComponent },
  { path: 'French', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
