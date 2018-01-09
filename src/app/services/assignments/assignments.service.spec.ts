import { TestBed, inject } from '@angular/core/testing';

import { AssignmentsService } from './assignments.service';

describe('AssignmentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssignmentsService]
    });
  });

  it('should be created', inject([AssignmentsService], (service: AssignmentsService) => {
    expect(service).toBeTruthy();
  }));
});
