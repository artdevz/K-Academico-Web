import { Component, OnInit } from '@angular/core';
import { User } from '../../models/users/user';
import { LoginService } from '../../auth/login.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { EMPTY, filter, map, switchMap, tap } from 'rxjs';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/students/student';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  userId: string | null = null;

  userProgress: number | null = null;
  
  avarages: number[] = [];
  bestAverage: number | null = null;
  worstAverage: number | null = null;
  averageOfAll: number | null = null;
  userAverage: number | null = null;

  constructor(
    private titleService: Title,
    private authS: LoginService,
    private studentS: StudentService,
    private router: Router) {}

  ngOnInit(): void {
    this.titleService.setTitle("Kacademic");

    const userID = this.authS.getLoggedInUser();
    
    if (!userID) this.router.navigate(["/auth/login"]);

    this.loadStudent();
    this.loadAverages();

  }

  private loadStudent(): void {
    this.authS.loggedInUser$.pipe(
      filter((userID): userID is string => !!userID),
      switchMap(userID => this.studentS.readById(userID)),
      map(student => student.summary.avarage)
    )
    .subscribe(average => {
      this.userAverage = average;
    })
  }

  private loadAverages(): void {    
    
    this.authS.loggedInUser$.pipe(
      filter((userID): userID is string => !!userID),
      switchMap(userID => this.studentS.readById(userID)),
      map(student => student.summary.enrollment)
    )
    .subscribe(enrollment => {
      const cohort = enrollment.slice(0, 7); // E.g: 2025104 (Year: 2025, Semester: 1, Course Code: 04)
    
      this.studentS.readAll().pipe(
        map((allStudents: Student[]) => {
          return allStudents.filter(student => student.enrollment.startsWith(cohort))
            .map(student => student.avarage);
        })
      ).subscribe(filteredAverages => {
        this.avarages = filteredAverages.sort((a, b) => a - b);

        this.bestAverage = this.avarages[0];
        this.worstAverage = this.avarages[this.avarages.length - 1]

        this.averageOfAll = this.avarages.reduce((acc, avg) => acc + avg, 0) / this.avarages.length;

      });

    });

  }

}
