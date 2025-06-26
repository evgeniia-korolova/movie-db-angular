import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environments';
import { IMovie, IMovieWithTrailer } from '../../core/interfaces/movie';
import {
  IMovieCard,
  IMovieResponse,
} from '../../core/interfaces/movies/movie.interface';
import {
  ILatestTrailersResponse,
  IVideoResponse,
} from '../../core/interfaces/movies/video.interface';

@Injectable({
  providedIn: 'root',
})
export class TrailersService {
  private baseUrl = environment.BASE_URL;
  private apiKey = environment.API_KEY;

  constructor(private http: HttpClient) {}

  getLatestTrailers(): Observable<IMovieWithTrailer[]> {
    const url = `${this.baseUrl}/movie/upcoming?api_key=${this.apiKey}&region=US`;

    return this.http.get<{ results: IMovieWithTrailer[] }>(url).pipe(
      switchMap((res) => {
        const movies = res.results;
        console.log(movies);

        const requests: Observable<IMovieWithTrailer>[] = movies.map((movie) =>
          this.getMovieTrailer(movie.id).pipe(
            map((trailerKey) => ({
              ...movie,
              trailerKey,
            }))
          )
        );
        return forkJoin(requests);
      }),
      map((moviesWithTrailers) =>
        moviesWithTrailers.filter((movie) => movie.trailerKey)
      )
    );
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  getNDaysAgo(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
  }

  getMoviesByCategory(category: string): Observable<IMovieResponse> {
    let url = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&sort_by=popularity.desc`;

    switch (category) {
      case 'popular':
        break;

      case 'streaming':
        url +=
          '&with_watch_providers=8&watch_region=US&with_watch_monetization_types=flatrate';
        break;

      case 'on-tv':
        url = `${this.baseUrl}/discover/tv?api_key=${this.apiKey}`;
        url += '&sort_by=popularity.desc';
        url += '&with_original_language=en'; // или 'ja', 'ko'
        url += '&vote_count.gte=50';

        break;

      case 'for-rent':
        url +=
          '&with_watch_monetization_types=rent&watch_region=US&sort_by=primary_release_date.desc';
        url += `&primary_release_date.lte=${this.getTodayDate()}`;
        break;
    }

    return this.http.get<IMovieResponse>(url);
  }

  getMovieTrailer(movieId: number): Observable<string | null> {
    const url = `${this.baseUrl}/movie/${movieId}/videos?api_key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map((res) => {
        const trailer = res.results.find(
          (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
        );
        return trailer?.key || null;
      })
    );
  }

  getTVTrailer(tvId: number): Observable<string | null> {
    const url = `${this.baseUrl}/tv/${tvId}/videos?api_key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map((res) => {
        const trailer = res.results.find(
          (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
        );
        return trailer?.key || null;
      })
    );
  }
}
