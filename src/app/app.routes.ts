import { Routes } from '@angular/router';
import { UserComponent } from './pages/admin/user/user.component';
import { CourseComponent } from './pages/admin/course/course.component';
import { UserDetailsComponent } from './pages/admin/user-details/user-details.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentComponent } from './pages/admin/student/student.component';

export const routes: Routes = [
    { path: "", component: DashboardComponent },
    { path: "auth/login", component: LoginComponent },
    { path: "admin/user", component: UserComponent },
    { path: "admin/user/:id", component: UserDetailsComponent },
    { path: "admin/course", component: CourseComponent },
    { path: "admin/student", component: StudentComponent },
];
