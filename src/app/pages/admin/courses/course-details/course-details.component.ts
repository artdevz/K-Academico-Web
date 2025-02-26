import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../services/course.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseDetailsDTO } from '../../../../models/courses/course-details-dto';
import { CourseRequestDTO } from '../../../../models/courses/course-request-dto';
import { Subject } from '../../../../models/subjects/subject';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent implements OnInit {

  id: string;
  courseDetails: CourseDetailsDTO | null = null;
  courseRequest: CourseRequestDTO = {};
  groupedSubjects: { [semester: number]: Subject[] } = {};

  constructor(private courseS: CourseService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get("id") ?? "";
  }

  ngOnInit(): void {    
    this.loadDetails();
  }

  loadDetails(): void {
    
    this.courseS.readById(this.id).subscribe({
      next: (data: CourseDetailsDTO) => {
        this.courseDetails = data;
        if (this.courseDetails?.subjects) this.groupSubjectsBySemester(); 
      },
      error: (err) => {
        console.error("Error at loading Details.", err);
      }
    });
  }

  update(): void {

    this.courseS.update(this.id, this.courseRequest).subscribe({
      next: () => {
        this.loadDetails();
      },
      error: err => {
        console.error(err + "Error at Update.");
      }
    });

  }

  groupSubjectsBySemester(): void {
    this.groupedSubjects = this.courseDetails?.subjects.reduce((acc, subject) => {
      if (!acc[subject.semester]) acc[subject.semester] = [];
      acc[subject.semester].push(subject);
      return acc;
    }, {} as { [semester: number]: Subject[] }) || {};
  }

  getSortedSemesters(): number[] {
    return Object.keys(this.groupedSubjects).map(Number).sort((a, b) => a - b);
  }

}
