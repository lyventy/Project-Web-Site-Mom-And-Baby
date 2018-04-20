import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import {HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { NavAdminComponent } from './components/nav-admin/nav-admin.component';
import { TrangchuAdminComponent } from './components/trangchu-admin/trangchu-admin.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { BoPhanComponent } from './components/bo-phan/bo-phan.component';
import { NguoiDungComponent } from './components/nguoi-dung/nguoi-dung.component';

const routes: Routes = [
  { path: 'loginAdmin', component: LoginAdminComponent},
  { path: 'admin', component: BoardAdminComponent, children:[
      {path: '', component: TrangchuAdminComponent  },
      {path: 'bophan', component: BoPhanComponent  },
      {path: 'user', component: NguoiDungComponent  },
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    BoardAdminComponent, 
    HeaderAdminComponent, 
    NavAdminComponent, 
    TrangchuAdminComponent, 
    LoginAdminComponent, 
    BoPhanComponent, NguoiDungComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
