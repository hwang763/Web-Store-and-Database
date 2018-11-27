import { Component, OnInit } from '@angular/core';
import Input from '@angular/core';
@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  
  @Input() showMe : boolean ;

  constructor() { }

  ngOnInit() {
  }

}
