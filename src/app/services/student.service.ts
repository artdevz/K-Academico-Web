import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/students/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private api = "http://localhost:8080/api/student";
  
  constructor(private http: HttpClient) {}

  create(student: Student): Observable<Student> {
    return this.http.post<Student>(this.api, student);
  }

  readAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.api);
  }

  readById(id: string): Observable<Student> {
      return this.http.get<Student>(`${this.api}/${id}`);
  }

  update(student: Student): Observable<Student> {
    return this.http.patch<Student>(`${this.api}/${student.id}`, student);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

}
