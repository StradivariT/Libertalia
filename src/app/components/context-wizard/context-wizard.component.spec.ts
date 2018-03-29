import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextWizardComponent } from './context-wizard.component';

describe('ContextWizardComponent', () => {
  let component: ContextWizardComponent;
  let fixture: ComponentFixture<ContextWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
