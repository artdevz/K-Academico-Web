export class Evaluation {

    id: string;
    enrollee: string;
    exam: string;
    score: number;

    constructor(
        id: string,
        enrollee: string,
        exam: string,
        score: number
    ) {
        this.id = id;
        this.enrollee = enrollee;
        this.exam = exam;
        this.score = score;
    }

}
