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
  
  onClick(event:any,userEmail:String,userPass:String,tempPass:String){
    if(tempPass!=userPass){
      alert ("Your two passwords do not match, please try again!");
    }
    else if(userEmail==""||userPass==""||tempPass==""){
      alert("You cannot leave any of the fields empty!");
    }
    else if(!this.validateEmail(userEmail)){
      alert("Please enter an email using the correct format!");
    }
   else{ this.http.post('/api/login',{
       email:userEmail,
       password:userPass,
       type:'user',
       activation:'active'
     })
     .subscribe(
       (data:any)=>{
         console.log(data);
         if(data=="exists"){
           alert("The username that you have entered already is in our database! Please use a different username or login!");
         }
         else{
           alert("User successfully created!");
         }
       })
       
  }
    
  }
 validateEmail(email:String) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }

}
