import { Component, OnInit } from '@angular/core';
import { User } from '../../models/users/user';
import { LoginService } from '../../auth/login.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  userId: string | null = null;

  constructor(private titleService: Title, private authS: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.titleService.setTitle("Kacademic");

    const userID = this.authS.getLoggedInUser();
    
    if (!userID) this.router.navigate(["/auth/login"]);

  }

}
