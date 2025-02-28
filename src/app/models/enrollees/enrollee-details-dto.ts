import { Evaluation } from "../evaluations/evaluation";
import { Enrollee } from "./enrollee";

export class EnrolleeDetailsDTO {

    summary: Enrollee;
    gradeName: string;
    professorName: string;
    evaluations: Evaluation[];

    constructor(
        summary: Enrollee,
        gradeName: string,
        professorName: string,
        evaluations: Evaluation[] = []
    ) {
        this.summary = summary;
        this.gradeName = gradeName;
        this.professorName = professorName;
        this.evaluations = evaluations;
    }

}
