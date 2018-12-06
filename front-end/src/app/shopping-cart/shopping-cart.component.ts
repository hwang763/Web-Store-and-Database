import { Component, OnInit,Input } from '@angular/core';
import {ShoppingService} from '../shopping.service';
import {ItemListService} from '../item-list.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
 purchaseList:Array<{fruit:String,pQuantity:number,quantity:number,price:number,solo:string}>=[];
 showMe:String;
  cartTotal:any;
 onClick(){
   this.showMe= this.itemListService.getAccountType();
   if(this.showMe!="user"&&this.showMe!="manager"){
       alert("Please login to use the shopping cart functionality!");
   }
   this.getCart();
   this.cartTotal=this.shoppingService.getTotal();
   console.log(this.cartTotal);
  }
  
  purchaseCart(){
      var purchased=confirm("Purchase Items In Your Cart");
      if(purchased==true){
          
          this.cartTotal=this.shoppingService.getTotal();
          this.shoppingService.clearList();
          this.getCart();
          alert(this.purchaseList);
      }
      else{
          
      }
      
  }
  
  clearCart(){
      var cleared = confirm("Are you sure you would like to clear your cart?")
      
      if(cleared==true){
          //items are cleared
          this.shoppingService.clearList();
          this.getCart();
          this.cartTotal=this.shoppingService.getTotal();
          console.log(this.cartTotal);
      }
      else{
          //do nothing
      }
      
  }
  
  increment(fruit:String,solo:string){
      this.shoppingService.increment(fruit);
      this.cartTotal=this.shoppingService.getTotal();
  }
  decrement(fruit:String,solo:string){
      this.shoppingService.decrement(fruit,solo);
      this.cartTotal=this.shoppingService.getTotal();
  }
  remove(fruit:String,price:number){
      this.shoppingService.removeFruit(fruit,price);
      this.cartTotal=this.shoppingService.getTotal();
  }
  getCart(){
      this.purchaseList=this.shoppingService.getList();
      this.cartTotal=this.shoppingService.getTotal();
  }
  constructor(private itemListService:ItemListService, private shoppingService:ShoppingService) { 
    
  }

  ngOnInit() {
  }

}
