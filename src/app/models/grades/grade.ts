import { Professor } from "../professors/professor";
import { Subject } from "../subjects/subject";

export class Grade {

    id: string;
    subject: string;
    professor: string;
    // enrollees: Enrolee[] = [];
    capacity: number;
    currentStudents: number;
    semester: string;
    locate: string;
    status: number;

    constructor(id: string, subject: string, professor: string, capacity: number, currentStudents: number, semester: string, locate: string, status: number) {
        this.id = id;
        this.subject = subject;
        this.professor = professor;
        this.capacity = capacity;
        this.currentStudents = currentStudents;
        this.semester = semester;
        this.locate = locate;
        this.status = status;
    }

}
