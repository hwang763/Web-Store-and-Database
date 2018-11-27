import { Injectable,Input, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemListService {
  public accountType:string;
  
  setAccount(type:string){
   if (type=='user'){
     this.accountType="user";
   }
   if (type=='manager'){
     this.accountType="manager";
   }
   console.log(this.accountType);
  }
  
  getAccountType(){
    return this.accountType;
  }

  constructor() { }
}
