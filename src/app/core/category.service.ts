import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Category {
  id: string;  // GUID
  name: string;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly baseUrl = `${environment.apiBase}/category`; // your backend route

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  getById(id: string): Observable<Category> {        // <-- string
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  create(name: string): Observable<void> {
    return this.http.post<void>(this.baseUrl, { name });
  }

  update(id: string, name: string): Observable<void> { // <-- string
    return this.http.put<void>(`${this.baseUrl}/${id}`, { name });
  }

  delete(id: string): Observable<void> {               // <-- string
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
