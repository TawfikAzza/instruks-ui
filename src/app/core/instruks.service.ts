import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Instruks } from './models/instruks.model';

@Injectable({ providedIn: 'root' })
export class InstruksService {
  private readonly baseUrl = `${environment.apiBase}/instruks`; // backend route already plural

  constructor(private http: HttpClient) {}

  getAll(): Observable<Instruks[]> {
    return this.http.get<Instruks[]>(this.baseUrl);
  }

  getById(id: string): Observable<Instruks> {                    // <-- string
    return this.http.get<Instruks>(`${this.baseUrl}/${id}`);
  }

  getByCategory(categoryId: string): Observable<Instruks[]> {    // <-- string
    return this.http.get<Instruks[]>(`${this.baseUrl}?categoryId=${encodeURIComponent(categoryId)}`);
  }

  create(dto: Partial<Instruks>): Observable<void> {
    return this.http.post<void>(this.baseUrl, dto);
  }

  update(id: string, dto: Partial<Instruks>): Observable<void> { // <-- string
    return this.http.put<void>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: string): Observable<void> {                         // <-- string
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
