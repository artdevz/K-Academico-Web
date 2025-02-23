import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/users/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserDTO } from '../../../../models/users/user-dto';

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

  constructor(private userS: UserService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get("id") ?? "";
  }

  ngOnInit(): void {    
    this.loadDetails();
  }

  loadDetails(): void {
    
    this.userS.readById(this.id).subscribe({
      next: (data) => {
        this.user = data; 
      },
      error: (err) => {
        console.error("Error at loading Details.", err);
      }
    });
  }

  update(): void {

    const dataDTO: UserDTO = {
      name: this.user.name,
      password: this.user.password
    };

    this.userS.update(this.id, dataDTO).subscribe({
      next: () => {
        this.loadDetails();
      },
      error: err => {
        console.error(err + "Error at Update.");
      }
    });

  }

}
