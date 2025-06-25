import { TestBed } from '@angular/core/testing';

import { FreeToWatchService } from './free-to-watch.service';

describe('FreeToWatchService', () => {
  let service: FreeToWatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreeToWatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
