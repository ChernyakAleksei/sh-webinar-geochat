import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';


export interface IUser {
  email: string;
  nickname: string;
  $key?: string;
}

@Injectable()
export class AuthService {
  public user: IUser = null;

  constructor(
    private af: AngularFire
  ) {}


  public loginAsUser(user: IUser) {
      const users = this.af.database.list('users');
      return  users.push(user)
              .then((u) => {
                user.$key = u.key;
                this.user = user;
                this.saveUser(this.user);
              });
  }


  public loadUser(): Promise<IUser> {
    let userKey = window.localStorage.getItem('user');
    if (!userKey) {
      return;
    }

    return  this.af.database.object('/users/' + userKey)
            .take(1)
            .toPromise()
            .then((user) => {
              console.log(user);
              this.user = user;
            });
  }

  private saveUser(user) {
    window.localStorage.setItem('user', user.$key);
  }

}
