import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = environment.BASE_URL;
  private apiKey = environment.API_KEY;

  private apiUrl = `${environment.BASE_URL}/movie/popular?api_key=${environment.API_KEY}`;

  constructor(private http: HttpClient) {}

  getTrendingMovies(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/trending/movie/week?api_key=${this.apiKey}`
    );
  }

  getTrending(mediaType: 'movie', timeWindow: 'day' | 'week'): Observable<any> {
    const url = `${this.baseUrl}/trending/${mediaType}/${timeWindow}?api_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  getLatestTrailers(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/movie/upcoming?api_key=${this.apiKey}`
    );
  }

  getPopularMovies(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}`
    );
  }

  getFreeToWatch(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}`
    );
  }

  getPopularByCategory(category: string): Observable<any> {
    let url = '';
    let params = '';
  
    switch (category) {
      case 'streaming':
        url = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}`;
        params = '&with_watch_providers=8&watch_region=US';
        break;
  
      case 'on-tv':
        url = `${this.baseUrl}/discover/tv?api_key=${this.apiKey}`;
        params = '&with_watch_providers=9&watch_region=US';
        break;
  
      case 'for-rent':
        url = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}`;
        params = '&with_release_type=3';
        break;
  
      case 'in-theaters':
        url = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}`;
        params = '&with_release_type=2';
        break;
  
      default:
        url = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}`;
    }
  
    return this.http.get<any>(url + params);
  }
}
