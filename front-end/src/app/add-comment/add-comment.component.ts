import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  constructor(private http:HttpClient) { }

  saveRaview(userName:String,itemName:String,reviewBox:String,ratingBox:Number){
    if (reviewBox==""){
      alert("Please write something in the review box!")
    }
    else if(!this.validateEmail(userName)){
      alert("Please enter a proper email for username!")
    }
    else if(confirm("Are you sure you would like to make this review?")){
      console.log("hi");
      this.http.post('/api/comment',{
       user:userName,
       item:itemName,
       value:reviewBox,
       rating:ratingBox
     })
     .subscribe(
       (data:any)=>{
         console.log(data);
           alert("Review Successfully Added");
       })
    }
  }
  validateEmail(email:String) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
  ngOnInit() {
  }

}
