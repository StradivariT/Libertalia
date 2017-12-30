import { Component, OnInit, Input } from '@angular/core';

export const contexts = {
  1: 'educPlans',
  2: 'courses',
  3: 'groups'
};

@Component({
  selector: 'context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.css']
})
export class ContextComponent {
  @Input('data-badge-caption') dataBadgeCaption: string;

  static contextType: number;
  contextTypeSelected: number;  

  static contextSelected = {
    educPlans: "-",
    courses: "-",
    groups: "-"
  }
  
  chooseSelection(type) {
    ContextComponent.contextType = type;
    this.contextTypeSelected = type;
  }

  get contextSelected() {
    return ContextComponent.contextSelected;
  }
}