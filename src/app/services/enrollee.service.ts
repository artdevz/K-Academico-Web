import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enrollee } from '../models/enrollees/enrollee';
import { Observable } from 'rxjs';
import { EnrolleeDetailsDTO } from '../models/enrollees/enrollee-details-dto';

@Injectable({
  providedIn: 'root'
})
export class EnrolleeService {

  private API = "http://localhost:8080/api/enrollee";
  
  constructor(private http: HttpClient) {}

  create(request: Enrollee): Observable<string> {
    return this.http.post<string>(this.API, request, { responseType: "text" as "json" } );
  }
  
  readAll(): Observable<Enrollee[]> {
    return this.http.get<Enrollee[]>(this.API);
  }

  readById(id: string): Observable<EnrolleeDetailsDTO> {
    return this.http.get<EnrolleeDetailsDTO>(this.API+"/"+id);
  }

  update(id: string, request: Enrollee): Observable<string> {
    return this.http.patch<string>(this.API+"/"+id, request, {responseType: "text" as "json"});
  }

  delete(id: string): Observable<string> {
    return this.http.delete<string>(this.API+"/"+id, { responseType: "text" as "json" } );
  }

}
