import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatRoomsService } from 'app/services/chat-rooms.service';

@Component({
  selector: 'app-chat-create',
  templateUrl: './chat-create.component.html',
  styleUrls: ['./chat-create.component.scss']
})
export class ChatCreateComponent implements OnInit {
  @Input() mapClick: EventEmitter<any>;
  @Output() onChatCreate = new EventEmitter();
  public lat: number;
  public lng: number;
  public name: string;

  constructor(
    private chatRoomsService: ChatRoomsService
  ) { }

  ngOnInit() {

  }

  public captureCoords() {
    let subscription = this.mapClick.subscribe((e) => {
      this.lat = e.latLng.lat()
      this.lng = e.latLng.lng();
      subscription.unsubscribe();
    });
  }

  public createChatRoom() {
    this.onChatCreate.emit({
      lat: this.lat,
      lng: this.lng,
      name: this.name
    });
  }

}
