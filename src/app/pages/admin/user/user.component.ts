import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  
  users: User[] = [];
  user: User = new User("", "", "", "");

  constructor(private userS: UserService) {}

  ngOnInit(): void {
    this.readAll();
  }

  create(): void {
    this.userS.create(this.user).subscribe(() => {
      this.readAll();
      this.user = new User("", "", "", "");
    })
  }

  readAll(): void {
    this.userS.readAll().subscribe((data) => {
      this.users = data;
    });
  }

  delete(id: string): void {
    this.userS.delete(id);
  }

}
