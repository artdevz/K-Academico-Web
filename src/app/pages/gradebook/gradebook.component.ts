import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StudentService } from '../../services/student.service';
import { catchError, EMPTY, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { LoginService } from '../../auth/login.service';
import { CommonModule } from '@angular/common';
import { EnrolleeDetailsDTO } from '../../models/enrollees/enrollee-details-dto';
import { GradeService } from '../../services/grade.service';
import { SubjectService } from '../../services/subject.service';
import { ProfessorService } from '../../services/professor.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-gradebook',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gradebook.component.html',
  styleUrl: './gradebook.component.scss'
})
export class GradebookComponent implements OnInit {

  enrollees: EnrolleeDetailsDTO[] = [];
  selectedEnrolleeIndex: number | null = null;
  selectedTab: string = 'summary'; // Default Tab

  constructor(
    private titleService: Title,
    private authService: LoginService,
    private studentService: StudentService,
    private gradeService: GradeService,
    private subjectService: SubjectService,
    private professorService: ProfessorService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle("Kacademic - Gradebook");

    this.authService.loggedInUser$.pipe(
      switchMap(userID => {
        if (!userID) {
          this.enrollees = [];
          return EMPTY;
        }
  
        return this.studentService.readById(userID).pipe(
          switchMap(student => {
            if (!student.enrollees || student.enrollees.length === 0) {
              this.enrollees = [];
              return EMPTY;
            }
  
            return forkJoin(
              student.enrollees.map(enrollee => 
                this.gradeService.readById(enrollee.grade).pipe(
                  switchMap(grade => {

                    const subject$ = this.subjectService.readById(grade.subject).pipe(
                      catchError(err => {
                        console.error(`Error fetching subject ${grade.subject}:`, err);
                        return of({ name: 'Unavailable' });
                      })
                    );

                    const professor$ = this.professorService.readById(grade.professor).pipe(
                      switchMap(professor => {
                        return this.userService.readById(professor.id).pipe(
                          catchError(err => {
                            console.error(`Error fetching user ${professor.id}:`, err);
                            return of({ name: 'Unavailable' });
                          })
                        );
                      }),
                      catchError(err => {
                        console.error(`Error fetching professor ${grade.professor}:`, err);
                        return of({ name: 'Unavailable' });
                      })
                    );

                    return forkJoin([subject$, professor$]).pipe(
                      map(([subject, user]) => {
                        return {
                          summary: enrollee,
                          gradeName: subject.name,
                          professorName: user.name,
                        } as EnrolleeDetailsDTO;
                      })
                    );

                  }),

                  catchError(err => {
                    console.error(`Error fetching grade for enrollee ${enrollee.grade}:`, err);
                    return of({
                      summary: enrollee,
                      gradeName: 'Unvaliable',
                      professorName: 'Unvaliable'
                    } as EnrolleeDetailsDTO);
                  })
                )
              )
            );
          }),
          tap(enrichedEnrollees => this.enrollees = enrichedEnrollees),
          catchError(err => {
            console.error('Error fetching enrollees:', err);
            this.enrollees = [];
            return EMPTY;
          })
        );
      })
    ).subscribe();
  }

  toggleDetails(index: number): void {
    if (this.selectedEnrolleeIndex === index) this.selectedEnrolleeIndex = null;
    else this.selectedEnrolleeIndex = index;
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

}
