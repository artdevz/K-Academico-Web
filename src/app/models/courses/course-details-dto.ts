import { Subject } from "../subjects/subject";
import { CourseResponseDTO } from "./course-response-dto";

export class CourseDetailsDTO {

    summary: CourseResponseDTO;
    subjects: Subject[];

    constructor(summary: CourseResponseDTO, subjects: Subject[] = []) {
        this.summary = summary;
        this.subjects = subjects;
    }

}
