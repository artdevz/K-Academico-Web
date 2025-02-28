export class Enrollee {

    id: string;
    grade: string;
    student: string;
    transcript: string;
    // evaluations: [] = [];
    absences: number;
    avarage: number;
    status: number;

    constructor(
        id: string,
        grade: string,
        student: string,
        transcript: string,
        absences: number,
        avarage: number,
        status: number
      ) {
        this.id = id;
        this.grade = grade;
        this.student = student;
        this.transcript = transcript;
        this.absences = absences;
        this.avarage = avarage;
        this.status = status;
      }

}
