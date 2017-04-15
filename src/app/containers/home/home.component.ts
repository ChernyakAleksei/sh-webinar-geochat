import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatRoomsService, IChatRoom, IChatMessage, IAFChatMessage } from 'app/services/chat-rooms.service';
import { MapComponent } from 'app/shared-components/map/map.component';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2'; 


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('map') map: MapComponent;
  public lat: number = 51.678418;
  public lng: number = 7.809007;
  public activeElement = 'chat';
  public messages: FirebaseListObservable<IChatMessage[]>;
  public activeChat: FirebaseObjectObservable<IChatRoom>;

  constructor(
    private chatRoomsService: ChatRoomsService
  ) { }

  ngOnInit() {
    this.chatRoomsService.getChatRoomsObservable()
    .subscribe((chatRooms) => {
      this.map.clearMarkers();
      chatRooms.forEach((room) => {
        this.map.addMarker(room.lat, room.lng, this.setCurrentChat.bind(this, room));
      });
  });
  }

  public setActive(activeElement: string) {
    this.activeElement = activeElement;
  }

  public setCurrentChat(chatRoom: IChatRoom) {
    if (this.activeChat) {
      this.chatRoomsService.leaveChat(this.activeChat);
      this.activeChat = null;
    }
    this.chatRoomsService.joinChat(chatRoom['$key'])
    .then((chat$) => { 
      this.activeChat = chat$; 
    });

    this.messages = this.chatRoomsService.getChatMessages(chatRoom['$key']);
  }

  public sendMessage(msg: IAFChatMessage) {
    this.messages.push(msg);
  }

  public createChatRoom($event) {
    this.chatRoomsService.addChatRoom($event.lat, $event.lng, $event.name)
    .then((chat) => {
      this.activeElement = 'chat';
    });
  }

}
