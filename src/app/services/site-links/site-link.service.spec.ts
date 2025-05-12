import { TestBed } from '@angular/core/testing';

import { SiteLinkService } from './site-link.service';

describe('SiteLinkService', () => {
  let service: SiteLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
