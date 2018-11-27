import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  getItems(){} //this one returns names and description
  
  onSelect(){} //this function takes care of clicking the item and displaying the description and price

}
