export class Student {

    id!: string;
    user!: string;
    course!: string;
    
    constructor(id: string, user: string, course: string) {
        this.id = id;
        this.user = user;
        this.course = course;
    }

}
