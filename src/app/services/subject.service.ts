import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../models/subjecties/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private api = "http://localhost:8080/api/student";
    
  constructor(private http: HttpClient) {}

  create(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.api, subject);
  }

  readAll(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.api);
  }

  readById(id: string): Observable<Subject> {
      return this.http.get<Subject>(`${this.api}/${id}`);
  }

  update(subject: Subject): Observable<Subject> {
    return this.http.patch<Subject>(`${this.api}/${subject.id}`, subject);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
    }

}
