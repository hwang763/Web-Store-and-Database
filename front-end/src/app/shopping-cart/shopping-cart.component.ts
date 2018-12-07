import { Component, OnInit,Input } from '@angular/core';
import {ShoppingService} from '../shopping.service';
import {ItemListService} from '../item-list.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
 purchaseList:Array<{fruit:String,pQuantity:number,quantity:number,price:number,solo:string}>=[];
 showMe:String;
  cartTotal:any;
  databaseQ:string;
    noBuy:boolean;
    tempQ:any;
    tempPurQ:string;
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
      var quantityMatch:boolean=true;
      for(var i=0;i<this.purchaseList.length;i++){
       this.tempPurQ=String(this.purchaseList[i].pQuantity);
            this.http.get('/api/items/'+this.purchaseList[i].fruit)
            .subscribe((data:any)=>{
             this.databaseQ=data.quantity;
             console.log("database:"+this.databaseQ+"purchased:"+this.tempPurQ);
             console.log(parseFloat(this.tempPurQ)>parseFloat(this.databaseQ))
             if (parseFloat(this.tempPurQ)>parseFloat(this.databaseQ)){
              quantityMatch=false;
             }
             
            })
            if (!quantityMatch)
             alert("The amount of "+this.purchaseList[i].fruit+" in your cart is higher than the amount available! Please fix this!");
             break;
      }
      
      if(purchased==true&&quantityMatch==true){
          
          this.getCart();
          console.log(JSON.stringify(this.purchaseList));
          for(var i=0;i<this.purchaseList.length;i++){
            this.tempPurQ=String(this.purchaseList[i].pQuantity);
            this.http.get('/api/items/'+this.purchaseList[i].fruit)
            .subscribe((data:any)=>{
             this.databaseQ=String(data.quantity);})
             console.log("database:"+this.databaseQ+"purchased:"+this.tempPurQ);
            this.tempQ=parseFloat(this.databaseQ)-parseFloat(this.tempPurQ);
            console.log("new quantity:"+this.tempQ);
            this.http.put('/api/buy/'+this.purchaseList[i].fruit,{
             quantity:this.tempQ
            }).subscribe((data:any)=>{
             console.log(data);
            })
          }
          alert("Purchase Successful!Your cart total was:$"+this.cartTotal);
          alert("Here is your reciept:"+JSON.stringify(this.purchaseList));
          this.shoppingService.clearList();
          this.getCart();
          console.log(this.cartTotal);
          
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
  constructor(private itemListService:ItemListService, private shoppingService:ShoppingService, private http:HttpClient) { 
    
  }

  ngOnInit() {
  }

}
