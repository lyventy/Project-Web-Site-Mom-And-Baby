import { Component, OnInit } from '@angular/core'
import {Http,Headers,Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { FormsModule, Form, FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { empty } from 'rxjs/Observer';
declare var $:any;
@Component({
  selector: 'app-bo-phan',
  templateUrl: './bo-phan.component.html',
  styleUrls: ['./bo-phan.component.css']
})
export class BoPhanComponent implements OnInit{
  private url = "http://localhost:88/bophan";
  dataBoPhans:any = [];
  BoPhan=null;
  constructor(private http:Http) { 
    this.list_data_boPhans();
  }
  //lay du lieu
  list_data_boPhans(){
    this.http.get(this.url).map((res:Response)=>res.json()).subscribe(data=>{
    this.dataBoPhans = data.data;
    })
  }
 
  ngOnInit() {
    $.getScript("assets/js/jsAdmin/boPhanVanChuyen.js");
  }

}
