import { Component, OnInit } from '@angular/core';
import {Http,Headers,Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { FormsModule, Form, FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
declare var $:any;
@Component({
  selector: 'app-bo-phan',
  templateUrl: './bo-phan.component.html',
  styleUrls: ['./bo-phan.component.css']
})
export class BoPhanComponent implements OnInit{
  private url = "http://localhost:88/bophan";
  show:any;
  kiemtra = false;
  dataBoPhans:any = [];
  TENBOPHAN ='';
  SDT_BOPHAN ='';
  EMAIL_DOITAC ='';
  MABOPHAN = null;
  constructor(private http:Http) { 
    this.list_data_boPhans();
  }
  keyup(value:string)
  {
    if(this.dataBoPhans.findIndex(i=>i.TENBOPHAN==value)!= -1)
    {
      // console.log(this.dataIntakes.findIndex(i=>i.name_ITK==value));
      this.show = 'Bị trùng với cơ sở dữ liệu';
      this.kiemtra=false;
    }     
    else if(this.dataBoPhans.findIndex(i=>i.TENBOPHAN==value)== -1)
    {
      // console.log(this.dataIntakes.findIndex(i=>i.name_ITK==value));
      this.show = 'Được dùng';
      this.kiemtra=true;
    }
  }

  //them du lieu
  onSubmit(formBoPhan){
    if(formBoPhan == false)
    {
      alert("Có lỗi xảy ra");
    }
    else
    {
      console.log(formBoPhan.value)
      const headers = new Headers({'Content-Type':'application/json'});
      this.http.post(this.url,formBoPhan.value,{headers}).toPromise()
        .then(res=>res.json())
        .then(resJson=>this.list_data_boPhans()); 
    }
    }      
  Reset(formBoPhan)
  {
    formBoPhan.reset();
  }
  //lay du lieu
  list_data_boPhans(){
    this.http.get(this.url).map((res:Response)=>res.json()).subscribe(data=>{
    this.dataBoPhans = data;
    })
  }
  //xoa du lieu
  deleteBoPhans(id:number)
  {
    let headers=new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({ headers: headers });
    this.http.delete(this.url+"/"+id).toPromise()
      .then(res=>res.json())
      .then(resJson=>this.list_data_boPhans());
  }
  //lay du lieu len modal edit
  getupdateBoPhans(boPhans:any)
  {
    this.TENBOPHAN = boPhans.TENBOPHAN;
    this.SDT_BOPHAN = boPhans.SDT_BOPHAN;
    this.EMAIL_DOITAC = boPhans.EMAIL_DOITAC;
    this.MABOPHAN = boPhans.MABOPHAN;
  }
  
  updateBoPhans(formEditBoPhans)
  {
  
      //console.log(formEditIntakes.value);
      let headers=new Headers({'Content-Type':'application/json'});
      let options = new RequestOptions({ headers: headers });
      this.http.put(this.url+"/"+formEditBoPhans.value.MABOPHAN,formEditBoPhans.value).toPromise()
        .then(res=>res.json())
        .then(resJson=>this.list_data_boPhans());
  }
  ngOnInit(): void {

 
  }

}
