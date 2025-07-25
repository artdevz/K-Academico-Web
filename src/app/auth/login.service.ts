import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API = "http://localhost:8080/api/auth/login";
  private readonly TOKEN = "authToken";

  private loggedInUserSubject = new BehaviorSubject<string | null>(this.getLoggedInUser());
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<string> {
    return this.http.post<string>(this.API, { email, password }, { responseType: "text" as "json" });
  }

  storeToken(token: string): void {    
    localStorage.setItem(this.TOKEN, token);
    this.loggedInUserSubject.next(this.getLoggedInUser());
  }

  loadToken(): string | null {
    return localStorage.getItem(this.TOKEN);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN);
    this.loggedInUserSubject.next(null);
  }

  decodeToken(): any | null {
    const token = this.loadToken();
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } 
    catch (error) {
      console.error("Error decoding the token.", error);
      return null;
    }
  }

  getLoggedInUser(): string | null {
    const decodedToken = this.decodeToken();
    return decodedToken ? decodedToken.id : null;
  }

  logout(): void {
    this.removeToken();
  }
}
