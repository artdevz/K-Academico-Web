import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grade } from '../models/grades/grade';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  private API = "http://localhost:8080/api/grade";
  
  constructor(private http: HttpClient) {}

  create(request: Grade): Observable<string> {
    return this.http.post<string>(this.API, request, { responseType: "text" as "json" } );
  }
  
  readAll(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.API);
  }

  readById(id: string): Observable<Grade> {
    return this.http.get<Grade>(this.API+"/"+id);
  }

  update(id: string, request: Grade): Observable<string> {
    return this.http.patch<string>(this.API+"/"+id, request, {responseType: "text" as "json"});
  }

  delete(id: string): Observable<string> {
    return this.http.delete<string>(this.API+"/"+id, { responseType: "text" as "json" } );
  }  

}
