import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = "http://localhost:8080/api/user";

  constructor(private http: HttpClient) {}

  create(user: User): Observable<string> {
    return this.http.post<string>(this.api, user, { responseType: "text" as "json" } );
  }
  
  readAll(): Observable<User[]> {
    return this.http.get<User[]>(this.api);
  }

  readById(id: string): Observable<User> {
    return this.http.get<User>(`${this.api}/${id}`);
  }

  update(user: User): Observable<User> {
    return this.http.patch<User>(`${this.api}/${user.id}`, user);
  }

  delete(id: string): Observable<void> {
    console.log(id);
    console.log(`${this.api}/${id}`);
    return this.http.delete<void>(`${this.api}/${id}`);
  }

}
