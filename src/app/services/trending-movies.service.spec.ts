import { TestBed } from '@angular/core/testing';

import { TrendingMoviesService } from './trending-movies.service';

describe('TrendingMoviesService', () => {
  let service: TrendingMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrendingMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
