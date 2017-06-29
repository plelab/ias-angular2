import {Injectable} from '@angular/core';
import {Routes} from '@angular/router';

import {IndexComponent} from '../../index/index.component';
import {SignupComponent} from '../../signup/signup.component';
import {SigninComponent} from '../../signin/signin.component';
import {SignoutComponent} from '../../signout/signout.component';
import {MultipartComponent} from '../../multipart/multipart.component';
import {WebsocketComponent} from '../../websocket/websocket.component';
import {AjaxComponent} from '../../ajax/ajax.component';
import {PageNotFoundComponent} from '../../page-not-found/page-not-found.component';

@Injectable()
export class RouteService {
  static appRoutes: Routes = [
    {path: "index", component: IndexComponent},
    {path: "signup", component: SignupComponent},
    {path: "signin", component: SigninComponent},
    {path: "signout", component: SignoutComponent},
    {path: "multipart", component: MultipartComponent},
    {path: "websocket", component: WebsocketComponent},
    {path: "ajax", component: AjaxComponent},
    {path: "error/404", component: PageNotFoundComponent},
    {path: "", redirectTo: "/index", pathMatch: "full"},
    {path: "**", redirectTo: "/error/404", pathMatch: "full"}
  ];

  constructor() {
  }

  static getRoutes(): Routes {
    return RouteService.appRoutes;
  }
}
