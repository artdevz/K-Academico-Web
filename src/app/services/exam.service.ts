import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from '../models/exams/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private API = "http://localhost:8080/api/exam";
    
  constructor(private http: HttpClient) {}

  create(request: Exam): Observable<string> {
    return this.http.post<string>(this.API, request, { responseType: "text" as "json" } );
  }
  
  readAll(): Observable<Exam[]> {
    return this.http.get<Exam[]>(this.API);
  }

  readById(id: string): Observable<Exam> {
    return this.http.get<Exam>(this.API+"/"+id);
  }

  update(id: string, request: Exam): Observable<string> {
    return this.http.patch<string>(this.API+"/"+id, request, {responseType: "text" as "json"});
  }

  delete(id: string): Observable<string> {
    return this.http.delete<string>(this.API+"/"+id, { responseType: "text" as "json" } );
  }
}
