import { Component, OnInit } from '@angular/core';
import {Http,Headers,Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { FormsModule, Form, FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
declare var $:any;

@Component({
  selector: 'app-trangchuUser',
  templateUrl: './trangchuUser.component.html',
  styleUrls: ['./trangchuUser.component.css'],
  providers: [CookieService]
})
export class TrangchuuserComponent implements OnInit {
  private url = "http://localhost:88/sanphamU/";
  dataSanPhamUs:any = [];
  SOLUONG: number = 1;
  MASP: number;
  TENSP	 ='';
  GIA ='';
  MOTA='';
  SanPhamChon: any;
  constructor(private http:Http,private cookies: CookieService) {
    this.list_data_sanphamUs();
   }
   //lay du lieu
   list_data_sanphamUs(){
    this.http.get(this.url).map((res:Response)=>res.json()).subscribe(data=>{
    this.dataSanPhamUs = data;
    })
  }
    //lay du lieu len modal edit
    getXemNhanh(sanPhams:any)
    {
      this.TENSP = sanPhams.TENSP;
      this.GIA = sanPhams.GIA;
      this.MOTA = sanPhams.MOTA;
      this.MASP = sanPhams.MASP;
    }
  // add vao gio hang
  
  ngOnInit():void {

    
  }
  addSanPham() {
      let q = this.SOLUONG;
      if (this.SOLUONG>0){
      this.http.get(this.url + this.MASP)
        .map((res: Response) => res.json())
        .subscribe(SanPhamChon => {
          this.SanPhamChon = SanPhamChon;
        

          //------------------------------------------------------------------------------
          let existMASP = this.cookies.get('MASP');
          let existTENSP = this.cookies.get('TENSP');
          let existSOLUONG = this.cookies.get('SOLUONG');
          let existGIA = this.cookies.get('GIA');

          if ((existMASP === "") && (existTENSP === "") && (existSOLUONG == "") && (existGIA == "")) {
            this.cookies.set('MASP', SanPhamChon.MASP + "|");
            this.cookies.set('TENSP', SanPhamChon.TENSP + "|");
            this.cookies.set('SOLUONG', this.SOLUONG + "|");
            this.cookies.set('GIA', SanPhamChon.GIA + "|");
            console.log(this.cookies.get('SOLUONG'));
          }
          else {
            this.cookies.set('MASP', existMASP + SanPhamChon.MASP + "|");
            this.cookies.set('TENSP', existTENSP + SanPhamChon.TENSP + "|");
            this.cookies.set('SOLUONG', existSOLUONG + q + "|");
            this.cookies.set('GIA', existGIA + SanPhamChon.GIA + "|");
            console.log(this.cookies.get('SOLUONG'));
          }
        });
      
      } else alert("Số lượng phải lớn hơn 0!");
    
      // alert(this.cookies.get('SnackQuantities'));
      // alert(this.cookies.get('SnackPrices'));
    }
   
}



