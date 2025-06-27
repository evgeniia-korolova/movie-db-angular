import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovieDetails } from '../../core/interfaces/movies/movie.interface';
import { environment } from '../../../environments/environments';
import { ITVDetails } from '../../core/interfaces/tv/tv.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsService {
  private baseUrl = environment.BASE_URL;
  private apiKey = environment.API_KEY;
  constructor(private http: HttpClient) {}

  getMovieDetails(id: number): Observable<IMovieDetails> {
    return this.http.get<IMovieDetails>(
      `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=en-US`
    );
  }

  getTVDetails(id: number): Observable<ITVDetails> {
    const url = `${this.baseUrl}/tv/${id}?api_key=${this.apiKey}&language=en-US`;
    return this.http.get<ITVDetails>(url);
  }
}
