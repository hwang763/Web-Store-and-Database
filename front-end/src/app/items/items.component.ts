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
  private fruitComments:Comment[]=[];
  private selectedFruit:Fruits;
  private showInfo:boolean=false;
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
  parseData(jsonData: string) {
    for (let i = 0; i < 10; i++) {
     var tempArray:Comment[]; 
      this.http.get('/api/comment/'+jsonData[i].name)
      .subscribe((comment:any)=>{
        if(comment.length==0){
          console.log("hi");
          const data = new Fruits(jsonData[i].name, jsonData[i].descript,jsonData[i].price,jsonData[i].tax,jsonData[i].quantity,jsonData[i].purchase,tempArray);
          if (data.quantity>0){
            this.items.push(data);
          }
        }
        else if (comment.length>0) {
          for (let i=0 ; i<5;i++){
            const temp = new Comment(comment[i].user,comment[i].item,comment[i].value,comment[i].rating);
            tempArray[i]=temp;
           }
        const data = new Fruits(jsonData[i].name, jsonData[i].descript,jsonData[i].price,jsonData[i].tax,jsonData[i].quantity,jsonData[i].purchase,tempArray);
         
          if (data.quantity>0){
            this.items.push(data);
          }
        }
      })
         
    }
  }
  
  getItems(){} //this one returns names and description
  
  onSelect(){} //this function takes care of clicking the item and displaying the description and price

}
