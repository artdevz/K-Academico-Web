export class Subject {

    id!: string;
    course!: string;
    type!: number;
    name!: string;
    description!: string;
    duration!: number;
    semester!: number;

    constructor(id: string, course: string, type: number, name: string, description: string, duration: number, semester: number) {
        this.id = id;
        this.course = course;
        this.type = type;
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.semester = semester;
    }

}
