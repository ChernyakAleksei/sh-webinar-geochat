import { Component, OnInit, Input } from '@angular/core';
import { IChatMessage } from 'app/services/chat-rooms.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() message: IChatMessage;

  constructor(
  ) { }

  ngOnInit() {

  }

}
