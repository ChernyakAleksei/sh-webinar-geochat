import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LayoutComponent } from './containers/layout/layout.component';
import { LoginComponent } from './containers/login/login.component';
import { HomeComponent } from './containers/home/home.component';

import { AuthService } from './services/auth.service';
import { ChatRoomsService } from './services/chat-rooms.service';
import { AuthGuardService } from './services/auth-guard.service';

import { routes } from './app-routes';
import { MapComponent } from './shared-components/map/map.component';
import { ChatComponent } from './containers/home/container-components/chat/chat.component';
import { MessageComponent } from './containers/home/container-components/message/message.component';
import { ChatCreateComponent } from './containers/home/container-components/chat-create/chat-create.component';
import { DateFormatPipe } from './pipes/date-format.pipe';

export const firebaseConfig = {
    apiKey: "AIzaSyCVzSilPYdZLZcOlvjvrHIil3nEjENXEBg",
    authDomain: "ng2-geochat-demo.firebaseapp.com",
    databaseURL: "https://ng2-geochat-demo.firebaseio.com",
    projectId: "ng2-geochat-demo",
    storageBucket: "ng2-geochat-demo.appspot.com",
    messagingSenderId: "1031128435695"
};

export function initializerFactory(auth: AuthService) {
  return function() {
    auth.loadUser()
  } 
}


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    HomeComponent,
    MapComponent,
    ChatComponent,
    MessageComponent,
    ChatCreateComponent,
    DateFormatPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    AuthService,
    ChatRoomsService,
    AuthGuardService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializerFactory,
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
