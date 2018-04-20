import { Component, OnInit } from '@angular/core';
import {Http,Headers,Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { FormsModule, Form, FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-giohang-user',
  templateUrl: './giohang-user.component.html',
  styleUrls: ['./giohang-user.component.css'],
  providers: [CookieService]
})
export class GiohangUserComponent implements OnInit {
  TENSParr: string[];
  SOLUONGarr: string[];
  GIAarr: string[];
  MASParr: string[];
  sumCost: number = 0;
  show:any;
  
  constructor(private http:Http,private cookie: CookieService,private router: Router)
   { }
   giamSL(index: number) {

    this.SOLUONGarr[index] = (+this.SOLUONGarr[index]-1).toString();
    console.log(this.SOLUONGarr[index]);
    this.TENSParr[index] =  this.TENSParr[index];
    this.MASParr[index] =  this.MASParr[index];
    this.GIAarr[index] = this.GIAarr[index];

    let newSnackID: string = '';
    let newName: string = '';
    let newPrice: string = '';
    let newQuantity: string = '';

    for (let i = 0; i < this.MASParr.length; i++)
      if (this.MASParr[i] !== "") {
        newSnackID += this.MASParr[i] + "|";
        newName += this.TENSParr[i] + "|";
        newPrice += this.GIAarr[i] + "|";
        newQuantity += this.SOLUONGarr[i] + "|";

      }

    this.cookie.set("MASP", newSnackID);
    this.cookie.set("TENSP", newName);
    this.cookie.set("GIA", newPrice);
    this.cookie.set("SOLUONG", newQuantity);
    this.sumCost=0;
    if (this.MASParr[0] !== "") {
      for (let i = 0; i < this.TENSParr.length; i++) {
        this.sumCost += parseInt(this.SOLUONGarr[i]) * parseInt(this.GIAarr[i]);
      }
    }  
  }
  xoaSP(index: number) {

    this.MASParr[index] = "";
    this.TENSParr[index] = "";
    this.SOLUONGarr[index] = "";
    this.GIAarr[index] = "";

    let newSnackID: string = '';
    let newName: string = '';
    let newPrice: string = '';
    let newQuantity: string = '';

    for (let i = 0; i < this.MASParr.length; i++)
      if (this.MASParr[i] !== "") {
        newSnackID += this.MASParr[i] + "|";
        newName += this.TENSParr[i] + "|";
        newPrice += this.GIAarr[i] + "|";
        newQuantity += this.SOLUONGarr[i] + "|";

      }

    this.cookie.set("MASP", newSnackID);
    this.cookie.set("TENSP", newName);
    this.cookie.set("GIA", newPrice);
    this.cookie.set("SOLUONG", newQuantity);
    this.sumCost=0;
    if (this.MASParr[0] !== "") {
      for (let i = 0; i < this.TENSParr.length; i++) {
        this.sumCost += parseInt(this.SOLUONGarr[i]) * parseInt(this.GIAarr[i]);
      }
    }  
  }
  tangSL(index: number) {

    this.SOLUONGarr[index] = (+this.SOLUONGarr[index]+1).toString();
    console.log(this.SOLUONGarr[index]);
    this.TENSParr[index] =  this.TENSParr[index];
    this.MASParr[index] =  this.MASParr[index];
    this.GIAarr[index] = this.GIAarr[index];

    let newSnackID: string = '';
    let newName: string = '';
    let newPrice: string = '';
    let newQuantity: string = '';

    for (let i = 0; i < this.MASParr.length; i++)
      if (this.MASParr[i] !== "") {
        newSnackID += this.MASParr[i] + "|";
        newName += this.TENSParr[i] + "|";
        newPrice += this.GIAarr[i] + "|";
        newQuantity += this.SOLUONGarr[i] + "|";

      }

    this.cookie.set("MASP", newSnackID);
    this.cookie.set("TENSP", newName);
    this.cookie.set("GIA", newPrice);
    this.cookie.set("SOLUONG", newQuantity);
    this.sumCost=0;
    if (this.MASParr[0] !== "") {
      for (let i = 0; i < this.TENSParr.length; i++) {
        this.sumCost += parseInt(this.SOLUONGarr[i]) * parseInt(this.GIAarr[i]);
      }
    }  
  }
  
  ngOnInit() {

    let TENSP = this.cookie.get('TENSP');
    TENSP = TENSP.substring(0, TENSP.length - 1);

    let MASP = this.cookie.get('MASP');
    MASP = MASP.substring(0, MASP.length - 1);

    let SOLUONG = this.cookie.get('SOLUONG');
    SOLUONG = SOLUONG.substring(0, SOLUONG.length - 1);
 
    let GIA = this.cookie.get('GIA');
    GIA = GIA.substring(0, GIA.length - 1);
    if(TENSP=="")
    {
    
      this.show = 'empty';
    }     
    else 
    {

    this.MASParr = MASP.split('|');
    this.TENSParr = TENSP.split('|');
    this.SOLUONGarr = SOLUONG.split('|');
    this.GIAarr = GIA.split('|');
    if (this.MASParr[0] !== "") {
      for (let i = 0; i < this.TENSParr.length; i++) {
        this.sumCost += parseInt(this.SOLUONGarr[i]) * parseInt(this.GIAarr[i]);
      }
    }
  }
  }

}
