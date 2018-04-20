import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderuserComponent } from './user/headerUser/headerUser.component';
import { FooteruserComponent } from './user/footerUser/footerUser.component';
import { BoarduserComponent } from './user/boardUser/boardUser.component';
import { TrangchuuserComponent } from './user/trangchuUser/trangchuUser.component';
import { SanphamUserComponent } from './user/sanpham-user/sanpham-user.component';
import { ChitietsanphamUserComponent } from './user/chitietsanpham-user/chitietsanpham-user.component';
import { GiohangUserComponent } from './user/giohang-user/giohang-user.component';

const routes: Routes = [
  { path: '', component: BoarduserComponent, children:[
    {path: '', component: TrangchuuserComponent},
    {path: 'sanpham', component: SanphamUserComponent},
    {path: 'giohang', component: GiohangUserComponent},
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderuserComponent,
    FooteruserComponent,
    BoarduserComponent, 
    TrangchuuserComponent,
    SanphamUserComponent,
    ChitietsanphamUserComponent,
    GiohangUserComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes) ,
    FormsModule,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
