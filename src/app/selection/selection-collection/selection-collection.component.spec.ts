import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionCollectionComponent } from './selection-collection.component';

describe('SelectionCollectionComponent', () => {
  let component: SelectionCollectionComponent;
  let fixture: ComponentFixture<SelectionCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
