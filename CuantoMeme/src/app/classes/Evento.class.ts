import { Classroom } from './Classroom.class';


export class Event {
    
    public title: string;
    public date: string;
    public imgURL: string;
    public description : string;
    public classrooms : string[];
    public place: string

    constructor(title: string, description: string, date:string,classrooms: string[], place: string){
        this.title = title,
        this.description = description,
        this.date = date,
        this.place = place
    }
    
}