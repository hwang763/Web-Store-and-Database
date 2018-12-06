import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
public accountType:string;
  list:Array<{fruit:String,pQuantity:number,quantity:number,price:number,solo:string}>=[];
  cartTotal:any=0;
  
  setList(temp:any){
    if (this.list.find(x=>x.fruit==temp.fruit)){
      
      var foundIndex = this.list.findIndex(x=>x.fruit==temp.fruit);
      var tempQ:string=String(this.list[foundIndex].pQuantity);
      this.list[foundIndex].pQuantity= parseFloat(tempQ)+parseFloat(temp.pQuantity);
      this.list[foundIndex].price=this.list[foundIndex].price+temp.price;
      this.cartTotal=this.cartTotal+parseFloat(temp.price);
      console.log(this.cartTotal);
    }
    else {this.list.push(temp);
    console.log(this.cartTotal);
    console.log(temp.price);
      this.cartTotal=this.cartTotal+parseFloat(temp.price);
      console.log(this.cartTotal);
    }
  }
  
  getList(){
    return this.list;
  }
  
  clearList(){
    this.list=[];
    this.cartTotal=0;
  }
  
  getTotal(){
    for( var i=0;i<this.list.length;i++){
      this.cartTotal=this.cartTotal+this.list[i].price;
    }
  }
  
  increment(fruit:String){
    var foundIndex = this.list.findIndex(x=>x.fruit==fruit);
     var temp:string=String(this.list[foundIndex].price);
     var soloP:string=String(this.list[foundIndex].solo);
     console.log(soloP);
     console.log(parseFloat(temp));
    this.list[foundIndex].pQuantity++ ;
    this.list[foundIndex].price=parseFloat(temp)+parseFloat(soloP);
     console.log(this.list[foundIndex].price);
  }
   decrement(fruit:String,soloP:string){
    var foundIndex = this.list.findIndex(x=>x.fruit==fruit);
    var temp:string=String(this.list[foundIndex].price);
    this.list[foundIndex].pQuantity-- ;
    this.list[foundIndex].price=parseFloat(temp)-parseFloat(soloP);
  }
  
  removeFruit(fruit:String,price:number){
    var foundIndex = this.list.findIndex(x=>x.fruit==fruit);
    this.cartTotal=this.cartTotal-this.list[foundIndex].price;
    this.list.splice(foundIndex, 1);
  }
  
 
  
  constructor() { }
}
