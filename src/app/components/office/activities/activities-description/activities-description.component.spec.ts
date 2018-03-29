import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesDescriptionComponent } from './activities-description.component';

describe('ActivitiesDescriptionComponent', () => {
  let component: ActivitiesDescriptionComponent;
  let fixture: ComponentFixture<ActivitiesDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
