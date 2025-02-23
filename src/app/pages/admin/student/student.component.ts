import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Student } from '../../../models/students/student';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent implements OnInit {

  students: Student[] = [];
  student: Student = new Student("", "", "");

  constructor(private studentS: StudentService) {}

  ngOnInit(): void {
      this.readAll();
  }

  create(): void {
    this.studentS.create(this.student).subscribe(() => {
      this.readAll();
      this.student = new Student("", "", "");
    });
  }

  readAll(): void {
    this.studentS.readAll().subscribe((data) => {
      this.students = data;
    });
  }

  delete(id: string): void {
    this.studentS.delete(id);
  }

}
