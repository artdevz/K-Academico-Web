import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/courses/course';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private api = "http://localhost:8080/api/course";

  constructor(private http: HttpClient) {}

  create(user: Course): Observable<Course> {
      return this.http.post<Course>(this.api, user);
    }
    
    readAll(): Observable<Course[]> {
      return this.http.get<Course[]>(this.api);
    }
  
    update(user: Course): Observable<Course> {
      return this.http.patch<Course>(`${this.api}/${user.id}`, user);
    }
  
    delete(id: string): Observable<void> {
      return this.http.delete<void>(`${this.api}/${id}`);
    }
  

}
