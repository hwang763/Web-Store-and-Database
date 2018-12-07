import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
public accountType:string;
  list:Array<{fruit:String,pQuantity:number,quantity:number,price:number,solo:string}>=[];
  cartTotal:any=0;
  databaseQ:any;
    noBuy:boolean;
    tempQ:any;
  
  setList(temp:any){
    if (this.list.find(x=>x.fruit==temp.fruit)){
      
      var foundIndex = this.list.findIndex(x=>x.fruit==temp.fruit);
      var tempQ:string=String(this.list[foundIndex].pQuantity);
      this.list[foundIndex].pQuantity= parseFloat(tempQ)+parseFloat(temp.pQuantity);
      this.list[foundIndex].price=this.list[foundIndex].price+temp.price;
      this.cartTotal=this.cartTotal+parseFloat(temp.price);
      console.log("caaat "+this.cartTotal);
    }
    else {this.list.push(temp);
    console.log(this.cartTotal);
    console.log(temp.price);
      this.cartTotal=this.cartTotal+parseFloat(temp.price);
      console.log("caaat"+ this.cartTotal);
    }
  }
  
  getList(){
    return this.list;
  }
  
  clearList(){
    this.list=[];
    this.cartTotal=0;
    console.log("clearrrr" +this.cartTotal);
  }
  
  getTotal(){
    return this.cartTotal;
  }
  
  increment(fruit:String){
    var foundIndex = this.list.findIndex(x=>x.fruit==fruit);
    console.log("initial "+this.cartTotal);
     var temp:string=String(this.list[foundIndex].price);
     var soloP:string=String(this.list[foundIndex].solo);
     console.log(soloP);
     console.log(parseFloat(temp));
    ++this.list[foundIndex].pQuantity ;
                
            this.http.get('/api/items/'+fruit)
            .subscribe((data:any)=>{
             this.databaseQ=data.quantity;
            console.log(this.list[foundIndex].pQuantity>this.databaseQ);
            if(this.list[foundIndex].pQuantity>this.databaseQ){
            console.log("greater");
            this.noBuy=true;
            console.log(this.noBuy);
            }
            if (this.list[foundIndex].pQuantity<=this.databaseQ){
            this.noBuy= false;
            console.log(this.noBuy);
            }
            if(this.noBuy){
                alert("Please enter a value lower than the available quantity!");
                --this.list[foundIndex].pQuantity ;
            }
            else{
                this.list[foundIndex].price=parseFloat(temp)+parseFloat(soloP);
                console.log("cartsolo " +soloP);
                this.cartTotal=this.cartTotal+parseFloat(soloP);
                console.log("cartinc"+this.cartTotal);
            }
            })
    
  }
   decrement(fruit:String,soloP:string){
    var foundIndex = this.list.findIndex(x=>x.fruit==fruit);
    var temp:string=String(this.list[foundIndex].price);
    this.list[foundIndex].pQuantity-- ;
    this.list[foundIndex].price=parseFloat(temp)-parseFloat(soloP);
    this.cartTotal=this.cartTotal-parseFloat(soloP);
    console.log("cartdec"+this.cartTotal);
  }
  
  removeFruit(fruit:String,price:number){
    var foundIndex = this.list.findIndex(x=>x.fruit==fruit);
    this.cartTotal=this.cartTotal-this.list[foundIndex].price;
    this.list.splice(foundIndex, 1);
  }
  
 checkQuantity(fruit:String,quantity:number){
   var databaseQ:number;
   this.http.get('/api/items/'+fruit)
   .subscribe((data:any)=>{
     databaseQ=data.quantity;
     console.log(databaseQ);
   })
   console.log(quantity);
   if(quantity>databaseQ){
     return true;
   }
   else if (quantity>databaseQ){
     return false;
   }
 }
  
  constructor(private http:HttpClient) { }
}
