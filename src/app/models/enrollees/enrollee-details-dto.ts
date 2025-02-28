import { Enrollee } from "./enrollee";

export class EnrolleeDetailsDTO {

    summary: Enrollee;
    gradeName: string;
    professorName: string;

    constructor(
        summary: Enrollee,
        gradeName: string,
        professorName: string
    ) {
        this.summary = summary;
        this.gradeName = gradeName;
        this.professorName = professorName;
    }

}
