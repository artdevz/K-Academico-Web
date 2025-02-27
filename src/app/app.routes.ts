import { Routes } from '@angular/router';
import { UserComponent } from './pages/admin/users/user/user.component';
import { CourseComponent } from './pages/admin/courses/course/course.component';
import { UserDetailsComponent } from './pages/admin/users/user-details/user-details.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentComponent } from './pages/admin/student/student.component';
import { TranscriptComponent } from './pages/transcript/transcript.component';
import { CourseDetailsComponent } from './pages/admin/courses/course-details/course-details.component';
import { CurriculumComponent } from './pages/curriculum/curriculum.component';
import { CardComponent } from './pages/card/card.component';
import { GradebookComponent } from './pages/gradebook/gradebook.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';

export const routes: Routes = [
    { path: "", component: DashboardComponent },
    { path: "gradebook", component: GradebookComponent }, // Diários
    { path: "academic-calendar", component: CalendarComponent }, // Calendário Acadêmico
    { path: "personal-schedule", component: ScheduleComponent }, // Horário Individual
    { path: "curriculum", component: CurriculumComponent }, // Matriz Escolar
    { path: "transcript", component: TranscriptComponent }, // Histórico Acadêmico
    { path: "report-card", component: CardComponent }, // Boletim
    { path: "auth/login", component: LoginComponent },
    { path: "admin/user", component: UserComponent },
    { path: "admin/user/:id", component: UserDetailsComponent },
    { path: "admin/course", component: CourseComponent },
    { path: "admin/course/:id", component: CourseDetailsComponent },
    { path: "admin/student", component: StudentComponent },
];
