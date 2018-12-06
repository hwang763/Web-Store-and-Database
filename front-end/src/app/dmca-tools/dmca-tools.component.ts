import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-dmca-tools',
  templateUrl: './dmca-tools.component.html',
  styleUrls: ['./dmca-tools.component.css']
})
export class DmcaToolsComponent implements OnInit {
  
  createNotice(event:any,noticeType:String,noticeContent:String){
    if (noticeContent==""){
      alert("Your notice content is empty!");
    }
    else{
      this.http.post('/api/DMCA',{
       type:noticeType,
       descript:noticeContent
     })
     .subscribe(
       (data:any)=>{
         console.log(data);
           alert("Notice successfully created!");
       })
      
    }
  }

  updateNotice(event:any,noticeType:String,noticeContent:String){
       this.http.put('/api/DMCA/'+noticeType,{
       descript:noticeContent
     })
     .subscribe(
       (data:any)=>{
         console.log(data);
       })
  }
  
  recordRequest(requestEmail:String,requestCode:String,requestIssue:String){
      console.log(requestEmail);
      if(!this.validateEmail(requestEmail)){
          alert("Enter a email in the correct format!");
      }
      else {this.http.post('/api/Request',{
        type:"Takedown Request",
        descript:requestIssue,
        code:requestCode,
        sender:requestEmail,
        sentTo:""
     })
     .subscribe(
       (data:any)=>{
         console.log(data);
           alert("Notice successfully created!");
       })
    }
  }
  
  logInfringement(requestCode:String,sendTo:String,issueReported:String){
      if(!this.validateEmail(sendTo)){
          alert("Enter a email in the correct format!");
      }
       else {this.http.post('/api/Request',{
        type:"Infringement Notice",
        descript:issueReported,
        code:requestCode,
        sender:"",
        sentTo:sendTo
     })
     .subscribe(
       (data:any)=>{
         console.log(data);
           alert("Notice successfully created!");
       })
    }
      
  }
  
  recordDispute(requestCode:String, requestEmail:String, claimIssue:String){
      if(!this.validateEmail(requestEmail)){
           alert("Enter a email in the correct format!");
      }
      else {this.http.post('/api/Request',{
        type:"Dispute Claim",
        descript:claimIssue,
        code:requestCode,
        sender:requestEmail,
        sentTo:""
     })
     .subscribe(
       (data:any)=>{
         console.log(data);
           alert("Notice successfully created!");
       })
    }
  }
  
  sendTakedown(email:String,signature:String,real:String,fake:String,sendContact:String,faith,accurate){
      if (faith.checked!=true||accurate.checked!=true){
          alert("Please agree to both terms before submitting this takedown.")
      }
      else if (!this.validateEmail(email)){
           alert("Enter a  recipient email in the correct format!");
      }
      else if(!this.validateEmail(sendContact)){
          alert("Enter a contact email in the correct format!")
      }
      else{
          this.http.post('/api/Takedown',{
        sendTo:email,
        signature:signature,
        work:real,
        infringement:fake,
        contact:sendContact
     })
     .subscribe(
       (data:any)=>{
         console.log(data);
           alert("Notice successfully created!");
       })
      }
      
  }
  showWorkflow(){
      var newWindow = window.open();
      newWindow.document.write("<p>This is the workflow of how to make a DMCA Request:<br> 1. Record the notice and disputes <br> 2.Send a takedown request using the tools provided below! </p>");
  }
  showInstructions(){
      var newWindow = window.open();
      newWindow.document.write("<p>This is the workflow of how to make a DMCA Request:<br> 1. Fill in all fields <br> 2. Assign a code for the submission <br> 3. Use proper email format! </p>");
  }
  
  validateEmail(email:String) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }

}
