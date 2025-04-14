import { TestBed } from '@angular/core/testing';

import { MinistrySystemService } from './ministry-system.service';

describe('MinistrySystemService', () => {
  let service: MinistrySystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinistrySystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
