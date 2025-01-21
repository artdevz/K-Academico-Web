import { Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { CourseComponent } from './pages/course/course.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

export const routes: Routes = [
    { path: "", redirectTo: "/admin/user", pathMatch: "full" },
    { path: "admin/user", component: UserComponent },
    { path: "admin/user/:id", component: UserDetailsComponent },
    { path: "admin/course", component: CourseComponent },
];
