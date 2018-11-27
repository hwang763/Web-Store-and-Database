import { Component, OnInit } from '@angular/core';
import Input from '@angular/core';
@Component({
  selector: 'new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  
  @Input() showNewUser : boolean;
  
  constructor() { }

  ngOnInit() {
  }

}
