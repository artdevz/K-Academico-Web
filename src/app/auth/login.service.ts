import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private api = "http://localhost:8080/api/auth/login"

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<string> {
    const payload = { email, password };
    return this.http.post<string>(this.api, payload, { responseType: "text" as "json" });
  }

}
