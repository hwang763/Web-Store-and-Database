import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-dmca-tools',
  templateUrl: './dmca-tools.component.html',
  styleUrls: ['./dmca-tools.component.css']
})
export class DmcaToolsComponent implements OnInit {
  
  createNotice(event:any,noticeType:String,noticeContent:String){
    if (noticeContent==""){
      alert("Your notice content is empty!");
    }
    else{
      this.http.post('/api/DMCA',{
       type:noticeType,
       descript:noticeContent
     })
     .subscribe(
       (data:any)=>{
         console.log(data);
           alert("Notice successfully created!");
       })
      
    }
  }

  updateNotice(event:any,noticeType:String,noticeContent:String){
       this.http.put('/api/DMCA/'+noticeType,{
       descript:noticeContent
     })
     .subscribe(
       (data:any)=>{
         console.log(data);
       })
  }
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }

}
