import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API = "http://localhost:8080/api/user";

  constructor(private http: HttpClient) {}

  create(user: User): Observable<string> {
    return this.http.post<string>(this.API, user, { responseType: "text" as "json" } );
  }
  
  readAll(): Observable<User[]> {
    return this.http.get<User[]>(this.API);
  }

  readById(id: string): Observable<User> {
    return this.http.get<User>(this.API+"/"+id);
  }

  update(user: User): Observable<User> {
    return this.http.patch<User>(this.API+"/"+user.id, user); // BUG
  }

  delete(id: string): Observable<string> {
    return this.http.delete<string>(this.API+"/"+id, { responseType: "text" as "json" } ); // BUG
  }

}
