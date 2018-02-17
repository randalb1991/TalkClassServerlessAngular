import { Classroom } from '../classes/Classroom.class';
import { Injectable } from '@angular/core';
import { Http, Response, JsonpModule, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

const BASE_URL = "https://15psp95at5.execute-api.us-east-1.amazonaws.com/dev/talkclass/classrooms"

@Injectable()
export class ClassroomsService {
    
    constructor(private http: Http){}

    getClassrooms(){
        return this.http.get(BASE_URL).map(
            response => this.generateClassrooms(response.json())//console.log(response.json())//this.generateClassrooms(response.json())//this.extractVinetas(response)
        )
    }    
    generateClassrooms(classrooms: any[]){
        var lu: Classroom[] = [];
        for (let classroom of classrooms) {
            lu.push(this.generateclass(classroom));
           }
        return lu;
      }
    generateclass(classroom: any){
        if (classroom['Tutor']){
            return new Classroom(classroom['Class'], classroom['Level'], classroom['Folder'],classroom['Topic'], classroom['Tutor']);
        }
        else{
            return new Classroom(classroom['Class'], classroom['Level'], classroom['Folder'],classroom['Topic'], '');
        }
    }
    create_classroom(classroom:string, level: string){
        let body = {
            class: classroom,
            level: level,
        }
        return this.http.post(BASE_URL,body).map(
            response => {
                console.log("status creacion classroom: "+response.status)
            },
            error => {console.error(error)}
        );
    }
}