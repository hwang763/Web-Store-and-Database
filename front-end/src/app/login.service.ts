import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  createUser(userEmail:String,userPass:String){
    this.http.post('https://hwang763-se3316-lab3-hwang763.c9users.io:8082/api/login',{
       email:userEmail,
       password:userPass
     })
     .subscribe(
       (data:any)=>{
         console.log(data);
       })
  }

  constructor(private http:HttpClient) { }
}
