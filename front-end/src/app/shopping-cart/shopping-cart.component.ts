import { Component, OnInit } from '@angular/core';
import {ShoppingService} from '../shopping.service'
import {ItemListService} from '../item-list.service'

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
 showMe:String;

 onClick(){
   this.showMe= this.itemListService.getAccountType();
   if(this.showMe!="user"&&this.showMe!="manager"){
       alert("Please login to use the shopping cart functionality!");
   }
  }
  
  purchaseCart(){
      var purchased=confirm("Purchase Items In Your Cart");
      if(purchased==true){
          alert("this is a reciept")
      }
      
  }
  
  clearCart(){
      var cleared = confirm("Are you sure you would like to clear your cart?")
      
      if(cleared==true){
          //items are cleared
      }
      else{
          //do nothing
      }
  }
  constructor(private itemListService:ItemListService) { 
    
  }

  ngOnInit() {
  }

}
