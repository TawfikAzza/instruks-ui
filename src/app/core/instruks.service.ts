import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Instruks } from './models/instruks.model';

@Injectable({
  providedIn: 'root'
})
export class InstruksService {
  private baseUrl = 'http://localhost:5000/api/instruks'; // adjust if needed

  constructor(private http: HttpClient) {}

  getAll(): Observable<Instruks[]> {
    return this.http.get<Instruks[]>(this.baseUrl);
  }

  get(id: string): Observable<Instruks> {
    return this.http.get<Instruks>(`${this.baseUrl}/${id}`);
  }

  create(instruks: Partial<Instruks>): Observable<Instruks> {
    return this.http.post<Instruks>(this.baseUrl, instruks);
  }

  update(id: string, instruks: Partial<Instruks>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, instruks);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
