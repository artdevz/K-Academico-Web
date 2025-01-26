import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private api = "http://localhost:8080/api/auth/login"
  private TOKEN = "jwt";

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<string> {
    const payload = { email, password };
    return this.http.post<string>(this.api, payload, { responseType: "text" as "json" });
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) return localStorage.getItem(this.TOKEN);
    return null;
  }

  getDecodedToken(): any | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    }
    catch (error) {
      console.error("Error at decoded Token");
      return null;
    }
  }

  getLoggedInUser(): any | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? { id: decodedToken.id, name: decodedToken.name, email: decodedToken.email, password: "" } : null;
  }

}
