export class Lesson {

    id: string;
    grade: string;
    enrollee: string;
    topic: string;
    date: string;
    status: number;

    constructor(
        id: string,
        grade: string,
        enrollee: string,
        topic: string,
        date: string,
        status: number
    ) {
        this.id = id;
        this.grade = grade;
        this.enrollee = enrollee;
        this.topic = topic;
        this.date = date;
        this.status = status;
    }

}
