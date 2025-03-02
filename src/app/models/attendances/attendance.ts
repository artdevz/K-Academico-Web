export class Attendance {

    id: string;
    enrollee: string;
    lesson: string;
    isAbsent: boolean;

    constructor(
        id: string,
        enrollee: string,
        lesson: string,
        isAbsent: boolean
    ) {
        this.id = id;
        this.enrollee = enrollee;
        this.lesson = lesson;
        this.isAbsent = isAbsent;
    }

}
