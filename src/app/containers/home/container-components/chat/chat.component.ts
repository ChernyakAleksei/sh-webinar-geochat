import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IChatRoom, IChatMessage, IAFChatMessage } from 'app/services/chat-rooms.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2'; 
import * as moment from 'moment';

import { AuthService } from 'app/services/auth.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() public chat: FirebaseObjectObservable<IChatRoom>;
  @Input() public messages: FirebaseListObservable<IChatMessage[]>;
  @Output() public newMessage: EventEmitter<IAFChatMessage> = new EventEmitter;

  public message: string = '';

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  sendMessage() {
    this.newMessage.emit({
      text: this.message, 
      author: this.auth.user.$key,
      date: moment().unix()
    });
    this.message = '';
  }

}
