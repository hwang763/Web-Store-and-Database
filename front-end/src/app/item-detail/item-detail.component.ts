import { Component, OnInit, Input } from '@angular/core';
import {Fruits} from '../fruits'
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
@Input() item: Fruits;
@Input() showMe:boolean;
  constructor() { }

  ngOnInit() {
  }

}
