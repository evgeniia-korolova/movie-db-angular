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


  private apiUrl = `${environment.BASE_URL}/movie/popular?api_key=${environment.API_KEY}`


  constructor(private http: HttpClient) {}

  getTrendingMovies(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/trending/movie/week?api_key=${this.apiKey}`);
  }

  getLatestTrailers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/upcoming?api_key=${this.apiKey}`);
  }

  getPopularMovies(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`);
  }

  getFreeToWatch(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}`);
  }



  // getPopularMovies(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
  // }
}
