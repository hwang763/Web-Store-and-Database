import { Component, OnInit } from '@angular/core';
import {Input} from '@angular/core';
import {LoginService} from '../login.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  
  @Input() showNewUser : boolean;
  
  onClick(event:any,userEmail:String,userPass:String){
    this.http.post('/api/login',{
       email:userEmail,
       password:userPass
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
