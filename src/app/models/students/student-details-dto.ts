import { Enrollee } from "../enrollees/enrollee";
import { Student } from "./student";

export class StudentDetailsDTO {

    summary: Student;
    enrollees: Enrollee[];

    constructor(
        summary: Student,
        enrollees: Enrollee[] = []
    ) {
        this.summary = summary;
        this.enrollees = enrollees;
    }

}
