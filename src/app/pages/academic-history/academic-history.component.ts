import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { LoginService } from '../../auth/login.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-academic-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './academic-history.component.html',
  styleUrl: './academic-history.component.scss'
})
export class AcademicHistoryComponent implements OnInit {

  user: User = new User("", "", "", "");
  courseName!: string;

  constructor(private authS: LoginService, private router: Router, private userS: UserService) {}
  
    ngOnInit(): void {
      this.user = this.authS.getLoggedInUser();
      if (this.authS.getLoggedInUser().id == "") this.router.navigate(["/auth/login"]);
      
      if (this.authS.getLoggedInUser().id != "") {
        // this.courseName = this.userS.readById(this.user.id)
      }

    }

}
