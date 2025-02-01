import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { LoginService } from '../../auth/login.service';
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

  user: User = new User("", "", "", "");

  constructor(private authS: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authS.getLoggedInUser();
    if (this.authS.getLoggedInUser().id == "") {
      this.router.navigate(["/auth/login"]);
    }
  }

}
