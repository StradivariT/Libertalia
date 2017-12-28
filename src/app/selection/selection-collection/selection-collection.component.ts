import { Component, OnInit } from '@angular/core';
import { SelectionComponent } from '../selection.component';

@Component({
  selector: 'selection-collection',
  templateUrl: './selection-collection.component.html',
  styleUrls: ['./selection-collection.component.css']
})
export class SelectionCollectionComponent extends SelectionComponent implements OnInit  {
  constructor() {
    super();
  }

  ngOnInit() {
    console.log("Hey");
  }
}
