import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesHeaderComponent } from './activities-header.component';

describe('ActivitiesHeaderComponent', () => {
  let component: ActivitiesHeaderComponent;
  let fixture: ComponentFixture<ActivitiesHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
