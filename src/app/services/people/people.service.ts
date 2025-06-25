import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { IPeopleResponse } from '../../core/interfaces/people/person.interface';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private baseUrl = environment.BASE_URL;
  private apiKey = environment.API_KEY;

  constructor(private http: HttpClient) {}

  getPeople(page: number = 1): Observable<IPeopleResponse> {
    return this.http.get<IPeopleResponse>(
      `${this.baseUrl}/person/popular?api_key=${this.apiKey}&page=${page}`
    );
  }
}
