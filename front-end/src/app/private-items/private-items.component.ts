import { Component, OnInit } from '@angular/core';
import {ItemListService} from '../item-list.service'
import {Fruits} from '../fruits';
import {HttpClient} from '@angular/common/http';
import {ShoppingService} from '../shopping.service'
@Component({
  selector: 'app-private-items',
  templateUrl: './private-items.component.html',
  styleUrls: ['./private-items.component.css']
})
export class PrivateItemsComponent implements OnInit {
  showMe:string;
  private items:Fruits[]=[];
  private selectedFruit:Fruits;
  private showInfo:boolean=false;
  private fruitQuantity:Array<{fruit:String,quantity:Number}>=[];
  
  
  constructor(private itemListService:ItemListService, private http:HttpClient, private shoppingService:ShoppingService) { 
    
  }
  ngOnInit(){
    
  }
  
  onClick(){
   this.showMe= this.itemListService.getAccountType();
   if (this.showMe=="user"){
   this.getPrivateItems();
    this.setData(); 
   }
   else if (this.showMe=="manager"){
       this.getPrivateItems();
      this.setData();
     alert("Please to refer to the tools below provided to a manager.");
   }
   else{
     alert("This list is not available to you at this time, please login or contact a system admin!");
   }
  
  }
  
  changeVis(commentID:String,commentVis:String){
      if(commentID==""){
          alert("Please enter the ID of the Comment");
      }
      else{
          this.http.put('/api/comment/vis/'+commentID,{
              visible:commentVis.toLowerCase()
          }).subscribe((data:any)=>{
              console.log(data);
          })
      }
  }
  
 addFruit(event:any,fruitName:String,fruitDescript:String,fruitPrice:Number,fruitTax:Number,fruitQuantity:Number){
   this.http.post('/api/items',{
       name:fruitName,
       descript:fruitDescript,
       price:fruitPrice,
       tax:fruitTax,
       quantity:fruitQuantity
     })
     .subscribe(
       (data:any)=>{
         console.log(data);
       })
     
  }
  
  addCart(item:String,purchaseNumber:number,rquantity:number,price:number){
      console.log(item);
      console.log(purchaseNumber);
      if(purchaseNumber==0){
          alert("Enter a value greater than 0")
      }
      else if(purchaseNumber>rquantity){
          alert("Please enter a value lower than the available stock!")
      }
      else{
          var totalPrice = purchaseNumber*price;
          console.log(price);
          this.shoppingService.setList({fruit:item,pQuantity:purchaseNumber,quantity:rquantity,price:totalPrice,solo:price})
          
          
      }
      
  }
  
  updateFruit(event:any,fruitName:String,fruitDescript:String,fruitPrice:Number,fruitTax:Number,fruitQuantity:Number){
       this.http.put('/api/items/'+fruitName,{
       name:fruitName,
       descript:fruitDescript,
       price:fruitPrice,
       tax:fruitTax,
       quantity:fruitQuantity
     })
     .subscribe(
       (data:any)=>{
         console.log(data);
       })
  }
  
  deleteFruit(event:any,fruitName:String){
        this.http.delete('/api/items/'+fruitName,{
            
        }) .subscribe(
            (data:any)=>{
                console.log(data);
            })     
  }
  getPrivateItems(){
      
      this.http.get('/api/items')
    .subscribe((data:any)=>{
      console.log(data[0].purchase);
      this.parseData(data);
      console.log(this.items);
    })
  } //gets the list of private items
  
  setData(){
      for(var i=0; i<this.items.length; i++){
       this.fruitQuantity[i].fruit=this.items[i].name;
       this.fruitQuantity[i].quantity=this.items[i].quantity;
       console.log(this.fruitQuantity[i]);
   }
   console.log(this.items);
   console.log(this.fruitQuantity);
  }
  
  parseData(jsonData:any) {
    for (var i = 0; i < jsonData.length; i++) {
        const data = new Fruits(jsonData[i].name, jsonData[i].descript,jsonData[i].price,jsonData[i].quantity,jsonData[i].purchase,jsonData[i].comment);
         
          if (data.quantity>0){
            this.items.push(data);
          }
        }
      }
         
  
}
