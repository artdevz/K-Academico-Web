import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../auth/login.service';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { catchError, Observable, switchMap } from 'rxjs';
import { CourseDetailsDTO } from '../../models/courses/course-details-dto';
import { Subject } from '../../models/subjects/subject';

@Component({
  selector: 'app-curriculum',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.scss'
})
export class CurriculumComponent implements OnInit {

  course: CourseDetailsDTO | null = null;
  groupedSubjects: { [semester: number]: Subject[] } = {};

  constructor(
    private authS: LoginService,
    private studentS: StudentService,
    private courseS: CourseService
  ) {}

  ngOnInit(): void {
    
    this.authS.loggedInUser$.pipe(
      switchMap(userID => {
        if (userID) {
          return this.studentS.readById(userID).pipe(            
            switchMap(student => this.courseS.readById(student.course)),
            catchError(err => {
              console.error('Error fetching course:', err);
              throw err;
            })
          );
        } else {
          this.course = null;
          return new Observable<CourseDetailsDTO | null>();
        }
      })
    ).subscribe({
      next: (course) => {
        this.course = course;
        if (this.course?.subjects) this.groupSubjectsBySemester();
      },
      error: (err) => {
        console.error('Error in curriculum component:', err);
        this.course = null;
      }
    });

  }

  groupSubjectsBySemester(): void {
    this.groupedSubjects = this.course?.subjects.reduce((acc, subject) => {
      if (!acc[subject.semester]) acc[subject.semester] = [];
      acc[subject.semester].push(subject);
      return acc;
    }, {} as { [semester: number]: Subject[] }) || {};
  }

  getSortedSemesters(): number[] {
    return Object.keys(this.groupedSubjects).map(Number).sort((a, b) => a - b);
  }

}
