import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginData = {
    email: "", password: ""
  };

  isLoading = false;
  errorMessage: string | null = null;

  constructor(private loginS: LoginService, private router: Router) {}

  redirectTo(route: string): void {
    this.router.navigate([route]);
  }

  login(): void {

    this.isLoading = true;
    this.errorMessage = null;

    const { email, password } = this.loginData;

    this.loginS.login(email, password).subscribe({
      next: (token: string) => {
        console.log("Login Successful: ", token);
        this.isLoading = false;

        localStorage.setItem("authToken", token);

        this.redirectTo("");        
      },
      error: (error) => {
        console.error("Login failed: ", error);
        this.errorMessage = "Invalid Email or Password. Please, try again.";
        this.isLoading = false;
      }
    });

  }

}
