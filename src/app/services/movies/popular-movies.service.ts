import { ITVResponse } from './../../core/interfaces/tv/tv.interface';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { IMovieResponse } from '../../core/interfaces/movies/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class PopularMoviesService { 

  private baseUrl = environment.BASE_URL;
  private apiKey = environment.API_KEY;

  constructor(private http: HttpClient) { }

  getPopularByCategory(category: string): Observable<IMovieResponse | ITVResponse> {
    
    let params = '';
    let endpoint = '/discover/movie';
  
  
    switch (category) {
      case 'streaming':
      params = '&with_watch_providers=8&watch_region=US';
      break;
    case 'on-tv':
      endpoint = '/discover/tv';
      params = '&with_watch_providers=9&watch_region=US';
      break;
    case 'for-rent':
      params = '&with_release_type=3';
      break;
  }

  const url = `${this.baseUrl}${endpoint}?api_key=${this.apiKey}${params}`;
  return this.http.get<IMovieResponse | ITVResponse>(url);
  }
}
