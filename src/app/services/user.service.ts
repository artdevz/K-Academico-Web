import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users/user';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/users/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API = "http://localhost:8080/api/user";

  constructor(private http: HttpClient) {}

  create(request: User): Observable<string> {
    return this.http.post<string>(this.API, request, { responseType: "text" as "json" } );
  }
  
  readAll(): Observable<User[]> {
    return this.http.get<User[]>(this.API);
  }

  readById(id: string): Observable<User> {
    return this.http.get<User>(this.API+"/"+id);
  }

  update(id: string, request: UserDTO): Observable<string> {
    return this.http.patch<string>(this.API+"/"+id, request, {responseType: "text" as "json"});
  }

  delete(id: string): Observable<string> {
    return this.http.delete<string>(this.API+"/"+id, { responseType: "text" as "json" } );
  }

}
