import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextWizardStepComponent } from './context-wizard-step.component';

describe('ContextWizardStepComponent', () => {
  let component: ContextWizardStepComponent;
  let fixture: ComponentFixture<ContextWizardStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextWizardStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextWizardStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
