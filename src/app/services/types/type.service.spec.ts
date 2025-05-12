import { TestBed } from '@angular/core/testing';

import { PostTypeService } from './type.service';

describe('TypeService', () => {
  let service: PostTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
