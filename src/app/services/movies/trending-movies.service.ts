import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrendingMoviesService {
  private baseUrl = environment.BASE_URL;
  private apiKey = environment.API_KEY;

  private apiUrl = `${environment.BASE_URL}/movie/popular?api_key=${environment.API_KEY}`;

  constructor(private http: HttpClient) {} 

  getTrending(mediaType: 'movie', timeWindow: 'day' | 'week'): Observable<any> {
    const url = `${this.baseUrl}/trending/${mediaType}/${timeWindow}?api_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}
