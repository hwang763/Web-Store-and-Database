import { Component, OnInit, Input } from '@angular/core';
import {List} from '../list'
@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {
@Input() list: List;
@Input() showMe:boolean;
@Input() fruitInfo:Array<{fruit:String,quantity:String}>;

private array:any;
  constructor() { }

  ngOnInit() {
  }

}
