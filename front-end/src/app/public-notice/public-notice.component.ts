import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-public-notice',
  templateUrl: './public-notice.component.html',
  styleUrls: ['./public-notice.component.css']
})
export class PublicNoticeComponent implements OnInit {
   security:String;
   dmca:String;
  
  getNotice(noticeType:String){
    this.http.get('/api/DMCA/'+noticeType)
    .subscribe((data:any)=>{
      console.log(data);
      if (noticeType=="Security"){
        console.log(data.descript);
        this.security=data.decript;
      }
      else if(noticeType=="Dmca"){
        this.dmca=data.descript;
      }
    })
  }
  
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }

}
