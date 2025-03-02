import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EErollee } from '../../enums/eerollee';
import { StudentService } from '../../services/student.service';
import { catchError, EMPTY, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { LoginService } from '../../auth/login.service';
import { CommonModule } from '@angular/common';
import { EnrolleeDetailsDTO } from '../../models/enrollees/enrollee-details-dto';
import { GradeService } from '../../services/grade.service';
import { SubjectService } from '../../services/subject.service';
import { ProfessorService } from '../../services/professor.service';
import { UserService } from '../../services/user.service';
import { EnrolleeService } from '../../services/enrollee.service';
import { Enrollee } from '../../models/enrollees/enrollee';
import { ExamService } from '../../services/exam.service';
import { LessonService } from '../../services/lesson.service';

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
  examDetailsMap: { [examId: string]: any } = {};
  lessonDetailsMap: { [lessonId: string]: any } = {};
  selectedTab: string = 'summary'; // Default Tab

  constructor(
    private titleService: Title,
    private authService: LoginService,
    private studentService: StudentService,
    private gradeService: GradeService,
    private subjectService: SubjectService,
    private professorService: ProfessorService,
    private userService: UserService,
    private enrolleeService: EnrolleeService,
    private examService: ExamService,
    private lessonService: LessonService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle("Kacademic - Gradebook");
    this.loadEnrollees();
  }

  private loadEnrollees(): void {
    this.authService.loggedInUser$.pipe(
      switchMap(userID => {
        if (!userID) {
          this.enrollees = [];
          return EMPTY;
        }
        return this.getStudentEnrollees(userID);
      }),
      tap(enrichedEnrollees => this.enrollees = enrichedEnrollees),
      catchError(err => {
        console.error('Error fetching enrollees:', err);
        this.enrollees = [];
        return EMPTY;
      })
    ).subscribe();
  }

  private getStudentEnrollees(userID: string) {
    return this.studentService.readById(userID).pipe(
      switchMap(student => {
        if (!student.enrollees || student.enrollees.length === 0) {
          this.enrollees = [];
          return EMPTY;
        }
        return this.getEnrolleeDetails(student.enrollees);
      })
    );
  }

  private getEnrolleeDetails(enrollees: Enrollee[]) {
    return forkJoin(
      enrollees.map(enrollee => this.getEnrolleeDTO(enrollee))
    );
  }

  private getEnrolleeDTO(enrollee: Enrollee) {
    return this.gradeService.readById(enrollee.grade).pipe(
      switchMap(grade => {
        const subject$ = this.getSubject(grade);
        const professor$ = this.getProfessor(grade);

        const enrolleeDetails$ = this.enrolleeService.readById(enrollee.id).pipe(
          catchError(err => {
            console.error(`Error fetching enrollee ${enrollee.id}:`, err);
            return of(enrollee);
          })
        );

        return forkJoin([subject$, professor$, enrolleeDetails$]).pipe(
          map(([subject, user, enrolleeDetails]) => {
            enrolleeDetails.evaluations?.forEach(evaluation => {
              this.getExamDetails(evaluation.exam).subscribe();
            });

            enrolleeDetails.attendances?.forEach(attendance => {
              this.getLessonDetails(attendance.lesson).subscribe();
            })

            return new EnrolleeDetailsDTO(
              enrollee,
              subject.name,
              user.name,
              enrolleeDetails.evaluations || [],
              enrolleeDetails.attendances || []
            );
          }) 
        );       
      }),
      catchError(err => {
        console.error(`Error fetching grade for enrollee ${enrollee.grade}:`, err);
        return of(new EnrolleeDetailsDTO(
          enrollee,
          'Unavailable',
          'Unavailable',
          []
        ));
      })
    );
  }

  private getSubject(grade: any) {
    return this.subjectService.readById(grade.subject).pipe(
      catchError(err => {
        console.error(`Error fetching subject ${grade.subject}:`, err);
        return of({ name: 'Unavailable' });
      })
    );
  }

  private getProfessor(grade: any) {
    return this.professorService.readById(grade.professor).pipe(
      switchMap(professor => this.userService.readById(professor.id).pipe(
        catchError(err => {
          console.error(`Error fetching user ${professor.id}:`, err);
          return of({ name: 'Unavailable' });
        })
      )),
      catchError(err => {
        console.error(`Error fetching professor ${grade.professor}:`, err);
        return of({ name: 'Unavailable' });
      })
    );
  }

  private getExamDetails(examId: string) {
    if (this.examDetailsMap[examId]) return of(this.examDetailsMap[examId]);

    return this.examService.readById(examId).pipe(
      tap(examDetails => {
        this.examDetailsMap[examId] = examDetails;
      }),
      catchError(err => {
        console.error(`Error fetching exam details for exam ID ${examId}:`, err);
        return of(null);
      })
    )

  }

  private getLessonDetails(lessonId: string) {
    console.log("ExamMap: ", this.examDetailsMap)
    console.log("LessonMap: ", this.lessonDetailsMap)
    if (this.lessonDetailsMap[lessonId]) return of(this.lessonDetailsMap[lessonId]);

    return this.lessonService.readById(lessonId).pipe(
      tap(lessonDetails => {
        this.lessonDetailsMap[lessonId] = lessonDetails;
      }),
      catchError(err => {
        console.error(`Error fetching lesson details for lesson ID ${lessonId}:`, err);
        return of(null);
      })
    )
  }

  getSortedEvaluations(): any[] {
    const selectedEnrollee = this.enrollees[this.selectedEnrolleeIndex || 0];
    return selectedEnrollee?.evaluations?.sort((a, b) => {
      const examNameA = this.examDetailsMap[a.exam]?.name || '';
      const examNameB = this.examDetailsMap[b.exam]?.name || '';
      return examNameA.localeCompare(examNameB);
    }) || [];
  }

  getSortedAttendances(): any[] {
    const selectedEnrollee = this.enrollees[this.selectedEnrolleeIndex || 0];
    return selectedEnrollee?.attendances?.sort((a, b) => {
      const lessonDateA = this.lessonDetailsMap[a.lesson]?.date || '';
      const lessonDateB = this.lessonDetailsMap[b.lesson]?.date || '';
      return lessonDateA.localeCompare(lessonDateB);
    })
  }

  toggleDetails(index: number): void {
    this.selectedEnrolleeIndex = this.selectedEnrolleeIndex === index ? null : index;
  }

  selectTab(tab: string, index: number): void {
    this.selectedTab = tab;
  }

  calculatePercentage(evaluation: any): number {
    const maximum = this.examDetailsMap[evaluation.exam]?.maximum;
    return maximum ? (evaluation.score / maximum) * 100 : 0;
  }

  getStatusEEnrollee(status: any): string {
    status = EErollee[status as keyof typeof EErollee]
        
    switch (status) {
      case EErollee.ENROLLED: return 'enrolled-status';
      case EErollee.APPROVED: return 'aproved-status';
      case EErollee.FINAL_EXAM: return 'final_exam-status';
      case EErollee.FAILED: return 'failed-status';
      case EErollee.SUSPENDED: return 'suspended-status';
      default: return '';
    }
  }

}
