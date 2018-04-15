import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderuserComponent } from './user/headerUser/headerUser.component';
import { FooteruserComponent } from './user/footerUser/footerUser.component';
import { BoarduserComponent } from './user/boardUser/boardUser.component';
import { TrangchuuserComponent } from './user/trangchuUser/trangchuUser.component';
import { BoardAdminComponent } from './admin/board-admin/board-admin.component';
import { HeaderAdminComponent } from './admin/header-admin/header-admin.component';
import { NavAdminComponent } from './admin/nav-admin/nav-admin.component';
import { TrangchuAdminComponent } from './admin/trangchu-admin/trangchu-admin.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';

const routes: Routes = [
  { path: '', component: BoarduserComponent, children:[
    {path: '', component: TrangchuuserComponent}
  ]},
  { path: 'admin', component: BoardAdminComponent, children:[
      {path: '', component: TrangchuAdminComponent}
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderuserComponent,
    FooteruserComponent,
    BoarduserComponent, 
    TrangchuuserComponent,
    BoardAdminComponent, 
    HeaderAdminComponent, 
    NavAdminComponent, 
    TrangchuAdminComponent, 
    LoginAdminComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes) ,
    FormsModule,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
