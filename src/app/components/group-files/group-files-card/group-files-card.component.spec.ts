import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupFilesCardComponent } from './group-files-card.component';

describe('GroupFilesCardComponent', () => {
  let component: GroupFilesCardComponent;
  let fixture: ComponentFixture<GroupFilesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupFilesCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupFilesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
