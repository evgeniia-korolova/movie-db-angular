import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { IMovieResponse } from '../../core/interfaces/movies/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class PopularMoviesService {

  @Input() voteAverage: number = 0;

  private baseUrl = environment.BASE_URL;
  private apiKey = environment.API_KEY;

  constructor(private http: HttpClient) { }

  getPopularByCategory(category: string): Observable<IMovieResponse> {
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
  
    return this.http.get<IMovieResponse>(url + params);
  }
}
