import { Subject } from "../subjects/subject";

export class Course {

    id!: string;
    name!: string;
    code!: string;
    duration!: number;
    description!: string;
    subjects: Subject[] = [];

    constructor(id: string, name: string, code: string, duration: number, description: string, subjects: Subject[] = []) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.duration = duration;
        this.description = description;
        this.subjects = subjects;
    }

}
