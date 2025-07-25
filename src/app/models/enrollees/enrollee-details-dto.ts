import { Attendance } from "../attendances/attendance";
import { Evaluation } from "../evaluations/evaluation";
import { Enrollee } from "./enrollee";

export class EnrolleeDetailsDTO {

    summary: Enrollee;
    gradeName: string;
    professorName: string;
    evaluations: Evaluation[];
    attendances: Attendance[];

    constructor(
        summary: Enrollee,
        gradeName: string,
        professorName: string,
        evaluations: Evaluation[] = [],
        attendances: Attendance[] = []
    ) {
        this.summary = summary;
        this.gradeName = gradeName;
        this.professorName = professorName;
        this.evaluations = evaluations;
        this.attendances = attendances;
    }

}
