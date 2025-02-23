import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API = "http://localhost:8080/api/auth/login";
  private readonly TOKEN = "authToken";

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<string> {
    return this.http.post<string>(this.API, { email, password }, { responseType: "text" as "json" });
  }

  storeToken(token: string): void {    
    localStorage.setItem(this.TOKEN, token);
  }

  loadToken(): string | null {
    if (window.localStorage) return localStorage.getItem(this.TOKEN);
    return null;
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
}
