import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  showForm:boolean = false;
  showNew:boolean =false;
  displayLogin(){
    this.showForm = !this.showForm;
  }
  
  createNew(){
    this.showNew = !this.showNew;
  }
  
  logout(){
   location.reload();
  }
  constructor() { }

  ngOnInit() {
  }

}
