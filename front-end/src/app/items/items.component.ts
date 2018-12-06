import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Fruits} from '../fruits';
import {Comment} from '../comment';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  private items:Fruits[]=[];
  private selectedFruit:Fruits;
  private showInfo:boolean=false;
  private commentList:Comment[]=[];
  constructor(private http:HttpClient) {
    this.http.get('/api/items')
    .subscribe((data:any)=>{
      console.log(data[0].purchase);
      this.parseData(data);
      console.log(this.items);
    })
}

selectFruit(item:Fruits){
  console.log("hi");
  this.selectedFruit=item;
  this.showInfo= !this.showInfo;
  console.log(this.selectedFruit);
}


  ngOnInit() {
  }
  parseData(jsonData:JSON) {
    for (let i = 0; i < 10; i++) {
        const data = new Fruits(jsonData[i].name, jsonData[i].descript,jsonData[i].price,jsonData[i].quantity,jsonData[i].purchase,this.commentList);
          if (data.quantity>0){
            this.items.push(data);
          }
        }
      }
  getComment(fruit:String){
    this.http.get('/api/comment/:item_name')
    .subscribe((comment:any)=>{
      if(comment.length<0){
        console.log("empty");
      }
      else{
        for (var i=0;i<comment.length;i++){
          var temp = new Comment(comment[i].user,comment[i].item,comment[i].value,comment[i].rating);
          this.commentList.push(temp);
        }
      }
      
    })
  }  
    
  
  
  getItems(){} //this one returns names and description
  
  onSelect(){} //this function takes care of clicking the item and displaying the description and price

}
