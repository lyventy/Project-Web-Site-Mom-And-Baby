import { Component, OnInit } from '@angular/core'
import {Http,Headers,Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { FormsModule, Form, FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { empty } from 'rxjs/Observer';
declare var $:any;
@Component({
  selector: 'app-anh-mo-ta',
  templateUrl: './anh-mo-ta.component.html',
  styleUrls: ['./anh-mo-ta.component.css']
})
export class AnhMoTaComponent implements OnInit {
  private url = "http://localhost:88/anhMoTa/sp";
  dataMoTas:any = [];
  MoTa=null;
  constructor(private http:Http) { 
    this.list_data_anhMoTa();
  }
  list_data_anhMoTa(){
    this.http.get(this.url).map((res:Response)=>res.json()).subscribe(data=>{
    this.dataMoTas = data.data;
    })
  }
  ngOnInit() {
    $.getScript("assets/js/jsAdmin/anhMoTa.js");
  }

}
