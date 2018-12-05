import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css']
})
export class UpdateUsersComponent implements OnInit {

updateUser(event:any,userEmail:String,userActive:String,userType:String){
  console.log(userEmail);
  console.log(userActive.toLowerCase());
  console.log(userType.toLowerCase());
  if(userEmail==""){
    alert("Please enter a user to modify!");
  }
  else if (!this.validateEmail(userEmail)){
    alert("Please enter the email in the correct format!");
  }
  else{
    this.http.put('/api/login/'+userEmail,{
       type:userType.toLowerCase(),
       activation:userActive.toLowerCase()
     })
     .subscribe(
       (data:any)=>{
         console.log(data);
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
