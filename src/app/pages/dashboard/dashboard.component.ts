import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { LoginService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  userId: string | null = null;

  constructor(private authS: LoginService, private router: Router) {}

  ngOnInit(): void {
    const userID = this.authS.getLoggedInUser();
    
    if (!userID) this.router.navigate(["/auth/login"]);

  }

}
