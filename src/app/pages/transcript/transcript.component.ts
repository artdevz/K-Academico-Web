import { Component, OnInit } from '@angular/core';
import { User } from '../../models/users/user';
import { LoginService } from '../../auth/login.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transcript',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transcript.component.html',
  styleUrl: './transcript.component.scss'
})
export class TranscriptComponent implements OnInit {

  user: User = new User("", "", "", "");
  courseName!: string;

  constructor(private authS: LoginService, private router: Router, private userS: UserService) {}
  
    ngOnInit(): void {
      /* this.user = this.authS.getLoggedInUser();
      if (this.authS.getLoggedInUser().id == "") this.router.navigate(["/auth/login"]);
      
      if (this.authS.getLoggedInUser().id != "") {
        // this.courseName = this.userS.readById(this.user.id)
      } */

    }

}
