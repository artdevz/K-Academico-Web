import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  userName: string | null = null;

  constructor(private authS: LoginService, private userS: UserService) {}

  ngOnInit(): void {
    this.userS.readById(this.authS.getLoggedInUser() ?? "").subscribe({

      next: data => {
        this.userName = data.name;
      },

      error: err => {
        console.error(err + "Error at Get User ID.");
      }

    });
  }

  logout(): void {}

}
