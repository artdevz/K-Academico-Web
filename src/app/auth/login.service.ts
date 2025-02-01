import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly API_URL = "http://localhost:8080/api/auth/login";
  private readonly TOKEN_KEY = "authToken";

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<string> {
    return this.http.post<string>(this.API_URL, { email, password }, { responseType: "text" as "json" });
  }

  storeToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  decodeToken(): any | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } 
    catch (error) {
      console.error("Error decoding token", error);
      return null;
    }
  }

  getLoggedInUser(): { id: string; name: string; email: string, password: string } {
    const decodedToken = this.decodeToken();
    return decodedToken ? { id: decodedToken.id, name: decodedToken.username, email: decodedToken.sub, password: "" } : {id:"", name:"", email:"", password:""};
  }
}
