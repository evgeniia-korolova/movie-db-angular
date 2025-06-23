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

   getFreeToWatch(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}`
    );
  }


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
  
 
}
