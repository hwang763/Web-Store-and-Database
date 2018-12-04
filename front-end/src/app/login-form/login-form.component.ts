import { Component, OnInit } from '@angular/core';
import {Input} from '@angular/core';
import {ItemListService} from '../item-list.service';
@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  
  @Input() showMe : boolean ;
  
  userType :string ;
  
  login(event:any,email:string,pass:string){
    console.log(email);
    if (email=="hwang763@uwo.ca"){
      this.userType="manager";
      
    }
    else{
      this.userType="user";
    }
    this.itemLisService.setAccount(this.userType);
    
    console.log(this.userType);
  }

  constructor(private itemLisService : ItemListService) { }

  ngOnInit() {
  }

}
