import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginData = { email: '', password: '' };
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private loginService: LoginService, private router: Router) {}

  login(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.loginService.login(this.loginData.email, this.loginData.password).subscribe({
      
      next: (token: string) => {
        console.log("Login Successful: ", token);
        this.loginService.storeToken(token);
        this.isLoading = false;
        this.router.navigate(['']);
      },

      error: (error) => {
        console.error("Login failed: ", error);
        this.errorMessage = "Invalid Email or Password. Please, try again.";
        this.isLoading = false;
      }

    });
  }
}