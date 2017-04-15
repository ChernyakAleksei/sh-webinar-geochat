import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2'; 
import { Moment } from 'moment';
import { AuthService, IUser } from 'app/services/auth.service';
import { Observable } from 'rxjs/observable';


export interface IChatRoom {
  lat: number;
  lng: number;
  name: string;
  users: string[];
}

// формат в котором будет храниться в Firebase
export interface IAFChatMessage {
  text: string;
  author: string;
  date: number;
}

// формат в которой мы будем преобразовываться при получении из Firebase
export interface IChatMessage {
  text: string;
  author: string;
  date: number;
  isAuthor: boolean;
  authorDetails: FirebaseObjectObservable<IUser>;
}

@Injectable()
export class ChatRoomsService {

  constructor(
    private af: AngularFire,
    private auth: AuthService
  ) { }

  addChatRoom(lat: number, lng: number, name: string) {
    return this.af.database.list('chatrooms').push({
      lat,
      lng,
      name,
      users: [this.auth.user.$key]
    });
  }

  joinChat(chatKey: string): Promise<FirebaseObjectObservable<IChatRoom>> {
    let chat$ = this.af.database.object(`chatrooms/${chatKey}`)

    let promise = new Promise((resolve) => {
      chat$
      .take(1)
      .subscribe((chat) => {
        chat$.update({
          users: Array.from(new Set([...chat.users, this.auth.user.$key]))
        })
        .then(resolve.bind(this, chat$));
      })
    })

    return promise;
  }

  leaveChat(chat$: FirebaseObjectObservable<IChatRoom>) {
    return  chat$
            .take(1)
            .toPromise()
            .then((chat) => {
              let users = chat.users.filter(v => v !== this.auth.user.$key);
              if (users.length === 0) {
                return chat$.remove();
              } else {
                return chat$.update({
                          users: users
                        });
              }
            })
  }

  getChatRoomsObservable(): FirebaseListObservable<IChatRoom[]> {
    return this.af.database.list('chatrooms');
  }

  getChatMessages(chatKey: string): FirebaseListObservable<IChatMessage[]> {
    return  this.af.database.list(`messages-${chatKey}`)
            .map(messages => messages.map((msg) => {
              let parsedMessage: IChatMessage = {
                ...msg,
                isAuthor: msg.author === this.auth.user.$key,
                authorDetails: this.getUserInfo(msg.author)
              }
              return parsedMessage;
            })) as FirebaseListObservable<IChatMessage[]>;
  }

  getUserInfo(userKey: string): FirebaseObjectObservable<IUser> {
    return this.af.database.object(`users/${userKey}`);
  }

}
