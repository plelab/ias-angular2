import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {IndexComponent} from './index/index.component';
import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';
import {SignoutComponent} from './signout/signout.component'
import {MultipartComponent} from './multipart/multipart.component';
import {WebsocketComponent} from './websocket/websocket.component';
import {AjaxComponent} from './ajax/ajax.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

import {RouteService} from './service/route/route.service';
import {AjaxService} from './service/ajax/ajax.service';
import {ApiService} from './service/api/api.service';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SignupComponent,
    SigninComponent,
    SignoutComponent,
    MultipartComponent,
    WebsocketComponent,
    AjaxComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(RouteService.getRoutes())
  ],
  providers: [RouteService, AjaxService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
