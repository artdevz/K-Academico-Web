import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/courses/course';
import { Observable } from 'rxjs';
import { CourseDetailsDTO } from '../models/courses/course-details-dto';
import { CourseRequestDTO } from '../models/courses/course-request-dto';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private API = "http://localhost:8080/api/course";

  constructor(private http: HttpClient) {}

  create(request: Course): Observable<string> {
    return this.http.post<string>(this.API, request, { responseType: "text" as "json" } );
  }
  
  readAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.API);
  }

  readById(id: string): Observable<CourseDetailsDTO> {
    return this.http.get<CourseDetailsDTO>(this.API+"/"+id);
  }

  update(id: string, request: CourseRequestDTO): Observable<string> {
    return this.http.patch<string>(this.API+"/"+id, request, {responseType: "text" as "json"});
  }

  delete(id: string): Observable<string> {
    return this.http.delete<string>(this.API+"/"+id, { responseType: "text" as "json" } );
  }

}
