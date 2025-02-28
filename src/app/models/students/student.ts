import { Enrollee } from "../enrollees/enrollee";

export class Student {

    id: string;
    user: string;
    course: string;
    enrollees: Enrollee[] = [];
    enrollment: string;
    avarage: number;
    
    constructor(
        id: string,
        user: string,
        course: string,
        enrollees: Enrollee[],
        enrollment: string,
        avarage: number
    ) {
        this.id = id;
        this.user = user;
        this.course = course;
        this.enrollees = enrollees;
        this.enrollment = enrollment;
        this.avarage = avarage;
    }

}
