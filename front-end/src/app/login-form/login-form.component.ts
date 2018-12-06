import { Component, OnInit } from '@angular/core';
import {Input} from '@angular/core';
import {ItemListService} from '../item-list.service';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  
  @Input() showMe : boolean ;
  
  userType :string ;
  
  login(event:any,userEmail:string,userPass:string){
    console.log(userEmail);
    if(userEmail==""||userPass==""){
      alert("You cannot leave the Email or Password fields empty!");
    }
    
    else if  (!this.validateEmail(userEmail)){
      alert("Please enter a proper email!");
    }
    else{(this.http.post('/api/login/verification',{
       email:userEmail,
       password:userPass
     })
     .subscribe(
       (data:String)=>{
         console.log(data);
         if (data=="incorrect"||data=="no match"){
           alert("Your email or password do not seem to match our records, please try again!");
         }
         else if(data=="deactivated"){
           alert("Your account seems to have been deactivated, please contact the system admin at hwang763@uwo.ca to get it re-activated!");
          
         }
         else if(data=="user"){
           this.userType="user";
           this.itemLisService.setAccount(this.userType,userEmail);
           alert("You have logged in as a general user! Welcome "+userEmail);
         }
         else if (data=="manager"){
           this.userType="manager";
           this.itemLisService.setAccount(this.userType,userEmail);
           alert("You have logged in as a manager! Welcome "+userEmail);
         }
       })
      
    )}
  }
 validateEmail(email:String) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
  constructor(private itemLisService : ItemListService, private http:HttpClient) { }

  ngOnInit() {
  }

}
