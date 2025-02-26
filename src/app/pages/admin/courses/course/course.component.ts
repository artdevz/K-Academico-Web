import { Component, OnInit } from '@angular/core';
import { Course } from '../../../../models/courses/course';
import { CourseService } from '../../../../services/course.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent implements OnInit {

  courses: Course[] = [];
  course: Course = new Course("", "", "", 0, "");

  constructor(private courseS: CourseService) {}

  ngOnInit(): void {
      this.readAll();
  }

  create(): void {
    this.courseS.create(this.course).subscribe(() => {
      this.readAll();
      this.course = new Course("", "", "", 0, "");
    })
  }
  
  readAll(): void {
    this.courseS.readAll().subscribe((data) => {
      this.courses = data;
    });
  }

  delete(id: string): void {
    this.courseS.delete(id).subscribe({
      next: msg => {
        this.readAll();
        alert(msg);
      },
      error: err => {
        alert(err + "Error at Delete.");
      }
    })
  }

}
