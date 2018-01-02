
export class Classroom {
    public level: string;
    public classs: string;
    public folder: string;
    public arn: string;
    public name:string;

    
    constructor(classs: string, level: string, folder: string, arn:string){
        this.classs = classs
        this.level = level
        this.folder = folder
        this.arn = arn
        this.name = this.classs+" "+this.level
    }

    get_leve(){
        return this.level
    }
    get_folder(){
        return this.folder
    }
    get_classs(){
        return this.classs
    }


}