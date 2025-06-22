import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class TrailersService {
  private baseUrl = environment.BASE_URL;
  private apiKey = environment.API_KEY;

  private apiUrl = `${environment.BASE_URL}/movie/popular?api_key=${environment.API_KEY}`;

  constructor(private http: HttpClient) {}

  getMoviesByCategory(category: string): Observable<any> {
    let url = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}`;

    switch (category) {
      case 'streaming':
        url += '&with_watch_providers=8&watch_region=US';
        break;
      case 'on-tv':
        url += '&with_watch_providers=9&watch_region=US';
        break;
      case 'for-rent':
        url += '&with_release_type=3';
        break;
      case 'in-theatres':
        url += '&with_release_type=2';
        break;
    }

    return this.http.get<any>(url);
  }

  getMovieTrailer(movieId: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movieId}/videos?api_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  getMovieTrailer2(movieId: number): Observable<string | null> {
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
}
