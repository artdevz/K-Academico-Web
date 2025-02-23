export class Course {

    id!: string;
    name!: string;
    code!: string;
    duration!: number;
    description!: string;

    constructor(id: string, name: string, code: string, duration: number, description: string) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.duration = duration;
        this.description = description;
    }

}
