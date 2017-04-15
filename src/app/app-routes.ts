import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './containers/layout/layout.component';
import { LoginComponent } from './containers/login/login.component';
import { HomeComponent } from './containers/home/home.component';

import { AuthGuardService } from 'app/services/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'chat', // дефолтный роут
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
        {
            path: 'login',
            component: LoginComponent
        },
        {
            path: 'chat',
            component: HomeComponent,
            canActivate: [AuthGuardService]
        }
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'chat', // дефолтный роут
  },
];

