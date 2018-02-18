export class Classroom {
    public level: string;
    public classs: string;
    public folder: string;
    public arn: string;
    public name: string;
    public tutor: string;


    constructor(classs: string, level: string, folder: string, arn: string, tutor: string) {
        this.classs = classs
        this.level = level
        this.folder = folder
        this.arn = arn
        this.name = this.classs + " " + this.level
        this.tutor = tutor
    }

    get_leve() {
        return this.level
    }
    get_folder() {
        return this.folder
    }
    get_classs() {
        return this.classs
    }


}