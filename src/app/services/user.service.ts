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

  create(user: User): Observable<User> {
    return this.http.post<User>(this.api, user);
  }
  
  readAll(): Observable<User[]> {
    return this.http.get<User[]>(this.api);
  }

  readId(id: string): Observable<User> {
    return this.http.get<User>(`${this.api}/${id}`);
  }

  update(user: User): Observable<User> {
    return this.http.patch<User>(`${this.api}/${user.id}`, user);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

}
