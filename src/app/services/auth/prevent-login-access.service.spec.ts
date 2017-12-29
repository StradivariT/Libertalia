import { TestBed, inject } from '@angular/core/testing';

import { PreventLoginAccess } from './prevent-login-access.service';

describe('PreventLoginAccess', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreventLoginAccess]
    });
  });

  it('should be created', inject([PreventLoginAccess], (service: PreventLoginAccess) => {
    expect(service).toBeTruthy();
  }));
});
