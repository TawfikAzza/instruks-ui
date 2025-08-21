import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './models/category.model'; // adjust if needed
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:5000/api/category';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  create(name: string): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, { name });
  }

  update(id: number, name: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, { id, name });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
