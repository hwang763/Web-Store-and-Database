import { Component, OnInit } from '@angular/core';
import {ItemListService} from '../item-list.service'
@Component({
  selector: 'app-private-items',
  templateUrl: './private-items.component.html',
  styleUrls: ['./private-items.component.css']
})
export class PrivateItemsComponent implements OnInit {
  showMe:string;

  constructor(private itemListService:ItemListService) { 
    
  }
  ngOnInit(){
    
  }
  
  onClick(){
   this.showMe= this.itemListService.getAccountType();
   if (this.showMe=="user"){
   this.getPrivateItems();}
   else if (this.showMe=="manager"){
     alert("Please to refer to the tools below to update the list as a manager.");
   }
   else{
     alert("This list is not available to you at this time, please login or contact a system admin!");
   }
  }
  
  getPrivateItems(){} //gets the list of private items
  
}
