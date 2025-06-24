import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { IPersonListItem } from '../core/models/people/person-list-item.model';


@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private baseUrl = environment.BASE_URL;
  private apiKey = environment.API_KEY;

  constructor(private http: HttpClient) { }

  getPeople(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/person/popular?api_key=${this.apiKey}&page=${page}`);
  }
}
