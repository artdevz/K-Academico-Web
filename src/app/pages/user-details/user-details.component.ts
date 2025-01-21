import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {

  id: string;
  user: User = new User("", "", "", "");

  constructor(
    private userS: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get("id") ?? "";
  }

  ngOnInit(): void {    
    this.loadUserDetails();
  }

  loadUserDetails(): void {
    
    this.userS.readId(this.id).subscribe({
      next: (data) => {
        this.user = data; 
      },
      error: (err) => {
        console.error("Error loading user details", err);
      }
    });
  }

  edit() {}

}
