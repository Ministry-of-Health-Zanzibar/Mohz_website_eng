import { TestBed } from '@angular/core/testing';

import { DepartmentProgramService } from './department-program.service';

describe('DepartmentProgramService', () => {
  let service: DepartmentProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
