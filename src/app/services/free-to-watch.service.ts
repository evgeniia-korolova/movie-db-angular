import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FreeToWatchService {

  private baseUrl = environment.BASE_URL;
  private apiKey = environment.API_KEY;


  constructor(private http: HttpClient) { }

  getFreeToWatchByCategory(category: string) {
    let url = '';
    let params = '';

    switch(category){
      case 'movies':
        url = `${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}`
        break;

        case 'tv':
          url = `${this.baseUrl}/discover/tv?api_key=${this.apiKey}`;
          params = '&with_watch_providers=9&watch_region=US';
        break;

        default:
          url = `${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}`
    }
    return this.http.get<any>(url + params);
  }

  getFreeToWatch(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}`
    );
  }
}
