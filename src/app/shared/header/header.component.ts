import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../auth/login.service';
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
    this.authS.loggedInUser$.subscribe(userID => {
      if (userID) {
        this.userS.readById(userID).subscribe({
          next: data => this.userName = data.name,
          error: err => console.error("Error at Get User ID.", err)
        });
      }
      else {
        this.userName = null;
      }
    });     
  }

  logout(): void {
    this.authS.logout();    
    window.location.reload();
  }

}
