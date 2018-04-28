import { TestBed, inject } from '@angular/core/testing';

import { SelectionStateService } from './barrel';

describe('SelectionStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectionStateService]
    });
  });

  it('should be created', inject([SelectionStateService], (service: SelectionStateService) => {
    expect(service).toBeTruthy();
  }));
});
