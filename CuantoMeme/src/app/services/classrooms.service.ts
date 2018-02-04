import { Classroom } from '../classes/Classroom.class';
import { Injectable } from '@angular/core';
import { Http, Response, JsonpModule, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ClassroomsService {
    constructor(private http: Http){}

    getClassrooms(){
        var url = "https://15psp95at5.execute-api.us-east-1.amazonaws.com/dev/talkclass/classrooms"
        return this.http.get(url).map(
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
        return new Classroom(classroom['Class'], classroom['Level'], classroom['Folder'],classroom['Topic']);
    }
}