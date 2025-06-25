import { TestBed } from '@angular/core/testing';

import { PopularMoviesService } from './popular-movies.service';

describe('PopularMoviesService', () => {
  let service: PopularMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopularMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
