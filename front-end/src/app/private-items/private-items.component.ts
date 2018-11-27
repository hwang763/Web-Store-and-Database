import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-items',
  templateUrl: './private-items.component.html',
  styleUrls: ['./private-items.component.css']
})
export class PrivateItemsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  getPrivateItems(){} //gets the list of private items
  
}
