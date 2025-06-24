import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPersonDetails } from '../core/models/people/person-details.model';

@Injectable({
  providedIn: 'root'
})
export class PersonDetailsService {
  private baseUrl = environment.BASE_URL;
  private apiKey = environment.API_KEY;

  http = inject(HttpClient)

  constructor() { }

  getPersonDetails(id: number): Observable<IPersonDetails> {
    const url = `${this.baseUrl}/person/${id}?api_key=${this.apiKey}&language=en-US`;
    return this.http.get<IPersonDetails>(url);
  }
}

// goToPersonDetails(id: number): void {
//   this.peopleService.getPersonDetails(id).subscribe((person) => {
//     console.log('Person details:', person);
//     // например, сохранить в переменную или перейти на страницу
//     this.selectedPerson = person;
//     this.router.navigate(['/person', id]);
//   });
// }
