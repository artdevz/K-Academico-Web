import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../auth/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  user: User = new User("", "", "", "");

  constructor(private authS: LoginService) {}

  ngOnInit(): void {
    this.user = this.authS.getLoggedInUser();
  }

}
