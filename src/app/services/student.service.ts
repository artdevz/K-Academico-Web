import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/students/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private API = "http://localhost:8080/api/student";
  
  constructor(private http: HttpClient) {}

  create(request: Student): Observable<string> {
    return this.http.post<string>(this.API, request, { responseType: "text" as "json" } );
  }
  
  readAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.API);
  }

  readById(id: string): Observable<Student> {
    return this.http.get<Student>(this.API+"/"+id);
  }

  update(id: string, request: Student): Observable<string> {
    return this.http.patch<string>(this.API+"/"+id, request, {responseType: "text" as "json"});
  }

  delete(id: string): Observable<string> {
    return this.http.delete<string>(this.API+"/"+id, { responseType: "text" as "json" } );
  }

}
