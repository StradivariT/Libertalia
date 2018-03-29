import { TestBed, inject } from '@angular/core/testing';

import { EducPlanService } from './educ-plan.service';

describe('EducPlanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EducPlanService]
    });
  });

  it('should be created', inject([EducPlanService], (service: EducPlanService) => {
    expect(service).toBeTruthy();
  }));
});
