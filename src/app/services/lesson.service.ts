import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../models/lessons/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private API = "http://localhost:8080/api/lesson";
      
    constructor(private http: HttpClient) {}
  
  create(request: Lesson): Observable<string> {
    return this.http.post<string>(this.API, request, { responseType: "text" as "json" } );
  }
  
  readAll(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(this.API);
  }

  readById(id: string): Observable<Lesson> {
    return this.http.get<Lesson>(this.API+"/"+id);
  }

  update(id: string, request: Lesson): Observable<string> {
    return this.http.patch<string>(this.API+"/"+id, request, {responseType: "text" as "json"});
  }

  delete(id: string): Observable<string> {
    return this.http.delete<string>(this.API+"/"+id, { responseType: "text" as "json" } );
  }

}
