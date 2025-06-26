import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IKnownForItem } from '../../core/interfaces/people/known-for-item.interface';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class KnownForService {
  private baseUrl = environment.BASE_URL;
  private apiKey = environment.API_KEY;

  constructor(private http: HttpClient) { }

  getKnownFor(id: number): Observable<IKnownForItem[]> {
    const url = `${this.baseUrl}/person/${id}/combined_credits?api_key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map((res) => {
        return res.cast
          .filter((item: any) => item.poster_path) 
          .sort((a: any, b: any) => b.popularity - a.popularity) 
          .slice(0, 10); // топ-10
      })
    );
  }
}
