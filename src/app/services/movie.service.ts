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

     
 
}
