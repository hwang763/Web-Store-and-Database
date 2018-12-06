import { Injectable,Input, ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Fruits} from './fruits'
@Injectable({
  providedIn: 'root'
})
export class ItemListService {
  public accountType:string;
  public userName:String
  setAccount(type:string,user:String){
   if (type=='user'){
     this.accountType="user";
     this.userName=user;
   }
   if (type=='manager'){
     this.accountType="manager";
     this.userName=user;
   }
   console.log(this.accountType);
   console.log(this.userName);
  }
  
  getAccountType(){
    return this.accountType;
  }
  getUsername(){
      return this.userName;
  }
  
  addFruit(fruitName:String,fruitDescript:String,fruitPrice:Number,fruitTax:Number,fruitQuantity:Number){
   this.http.post('https://hwang763-se3316-lab3-hwang763.c9users.io:8082/api/items',{
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



  constructor(private http:HttpClient) { }
}
