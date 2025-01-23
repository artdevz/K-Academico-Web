import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Professor } from '../models/professor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  private api = "http://localhost:8080/api/student";
    
  constructor(private http: HttpClient) {}

  create(professor: Professor): Observable<Professor> {
    return this.http.post<Professor>(this.api, professor);
  }

  readAll(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.api);
  }

  readById(id: string): Observable<Professor> {
      return this.http.get<Professor>(`${this.api}/${id}`);
  }

  update(professor: Professor): Observable<Professor> {
    return this.http.patch<Professor>(`${this.api}/${professor.id}`, professor);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

}
