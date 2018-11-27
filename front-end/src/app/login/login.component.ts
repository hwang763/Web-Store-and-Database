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
    this.showForm = true;
  }
  
  createNew(){
    this.showNew = true;
  }
  constructor() { }

  ngOnInit() {
  }

}
