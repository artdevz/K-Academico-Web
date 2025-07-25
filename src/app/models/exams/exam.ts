export class Exam {

    id: string;
    // evaluations: [] = [];
    grade: string;
    name: string;
    maximum: number;
    date: string;

    constructor(
        id: string,
        grade: string,
        name: string,
        maximum: number,
        date: string
    ) {
        this.id = id;
        this.grade = grade;
        this.name = name;
        this.maximum = maximum;
        this.date = date;
    }

}
