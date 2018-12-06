import { Component, OnInit } from '@angular/core';
import {ItemListService} from '../item-list.service';
import {HttpClient} from '@angular/common/http';
import {List} from '../list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  private userName:String;
  private showMe:String;
  private url:String;
  private itemList:List[]=[];
  private publicList:List[]=[];
  private items:Array<{fruit:String,quantity:string}>;
  private selectedList:List;
  private showInfo:boolean=false;
  
  constructor(private itemListService:ItemListService, private http:HttpClient) { 
   
  }
  selectItem(list:List){
  console.log("hi");
  this.selectedList=list;
  this.showInfo= !this.showInfo;
  console.log(this.selectedList);
}
  
   createList(listName:String,listDescript:String,visibilityBox:String){
     if (listName==""||listDescript==""){
       alert("You cannot leave any fields blank!")
     }
     else{
       this.http.post('/api/list',{
       user:this.userName,
       name:listName,
       descript:listDescript,
       visible:visibilityBox
     })
     .subscribe(
       (data:any)=>{
         console.log(data);
         alert("List Successfully Created!")
       })
     }
     this.getList();
   }
   
   edit(editList:String,renameList:String,editDescript:String,editVis:String){
     console.log(editList);
     if(editList==""){
       alert("Please specify the list you would like to edit");
     }
     else if (renameList==""){
       this.url=editList;
       renameList=editList;
       this.http.put('/api/list/'+this.url,{
         user:this.userName,
         name:renameList,
         descript:editDescript,
         visible:editVis
       })
       .subscribe((data:any)=>{
         console.log(data);
         alert("Successfully Updated List");
       })
     }
     else{
       this.url=editList;
       this.http.put('/api/list/'+this.url,{
         user:this.userName,
         name:renameList,
         descript:editDescript,
         visible:editVis
       })
       .subscribe((data:any)=>{
         console.log(data);
         alert("Successfully Updated List");
       })
     }
     this.getList();
   }
   
   deleteList(delList:String){
     if(delList==""){
       alert("Please specify the list you would like to delete")
     }
     else if (confirm("Are you sure you would like to delete this list?")) {
       var tempUser = this.userName;
       this.http.post('/api/deleteList/'+delList,{
         user:tempUser
       })
       .subscribe((data:any)=>{
         console.log(data);
       })
     }
     this.getList();
   }
   addListItem(addList:String,addItem:String,quantityItem:String){
     if(addList==""){
       alert("Please specify the list you would like to add an item to!")
     }
     else if (addItem==""||quantityItem==""){
       alert("Please specify the item and quantity that you would like to add to the list!")
     }
     else {
       this.http.put('/api/addtolist/'+addList,{
         user:this.userName,
         fruit:addItem,
         quantity:quantityItem
       }).subscribe ((data:any)=>{
         console.log(data);
       })
       
     }
     this.getList();
   }
   
   deleteI(itemDList:String,deleteItem:String){
     if(itemDList==""){
       alert("Please specify the list you would like to add an item to!")
     }
     else if (deleteItem==""){
       alert("Please specify the item you would like to delete!")
     }
     else {
       this.http.put('/api/deleteFrom/'+itemDList,{
         user:this.userName,
         fruit:deleteItem,
  
       }).subscribe ((data:any)=>{
         console.log(data);
       })
       
     }
     this.getList();
   }
   getList(){
     this.itemList=[];
     console.log("hi");
     
    this.http.get('/api/list/'+this.userName)
    .subscribe((data:any)=>{
      console.log(data);
      this.parseData(data);
      console.log(this.itemList);
     
    })
   }
   getPublicList(){
     this.publicList=[];
     console.log("publicList");
     
    this.http.get('/api/list')
    .subscribe((data:any)=>{
      console.log(data);
      this.parsePublicData(data);
      console.log(this.publicList);
     
    })
   }
   
    parseData(jsonData:any) {
    for (let i = 0; i < jsonData.length; i++) {
     var list = new List(jsonData[i].user,jsonData[i].name,jsonData[i].descript,jsonData[i].fruits)
     console.log(jsonData[i].fruits);
     //this.items=jsonData[i].fruits;
     this.itemList.push(list);       
    }
  }
  
   
   parsePublicData(jsonData:any) {
    for (let i = 0; i < jsonData.length; i++) {
     var list = new List(jsonData[i].user,jsonData[i].name,jsonData[i].descript,jsonData[i].fruits)
     console.log(jsonData[i].fruits);
     //this.items=jsonData[i].fruits;
     if(jsonData[i].user!=this.userName){
       this.publicList.push(list); 
     }      
    }
  }
   onClick(){
   this.showMe= this.itemListService.getAccountType();
   
   this.userName=this.itemListService.getUsername();
   this.getList();
   this.getPublicList();
   console.log(this.userName);
   if(this.showMe!="user"&&this.showMe!="manager"){
       alert("Please login to use the list functionality!");
   }
  } 
  ngOnInit() {
  }

}
