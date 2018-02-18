import { Classroom } from './Classroom.class';


export class Event {
    
    public title: string;
    public date: string;
    public imgURL: string;
    public description : string;
    public classrooms : string[];
    public place: string;
    public event_picture_path: string;
    public tags_event_picture: string[];

    

    constructor(title: string, description: string, date:string,classrooms: string[], place: string, event_picture_path:string,tags_event_picture:string[]){
        this.title = title,
        this.description = description,
        this.date = date,
        this.place = place
        this.classrooms = classrooms
        this.event_picture_path = event_picture_path
        this.tags_event_picture = tags_event_picture
    }
    add_classroom(classroom: string){
        this.classrooms.push(classroom)
    }
    
    add_classrooms(classrooms: string[]){
        for(let classroom of classrooms){
            this.add_classroom(classroom)
        }
    }
    modify_date(date: string){
        this.date = date
    }
    
}