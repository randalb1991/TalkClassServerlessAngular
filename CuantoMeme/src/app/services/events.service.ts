import { Event } from '../classes/Evento.class';
import { Usuario } from '../classes/Usuario.class';
import { Comentario } from '../classes/Comentario.class';
import { Tag } from '../classes/Tag.class';

import { Injectable } from '@angular/core';
import { Http, Response, JsonpModule, RequestOptions, Headers } from '@angular/http';
import { LoginService } from './login.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Classroom } from 'app/classes/Classroom.class';
import { error } from 'selenium-webdriver';


const BASE_URL = 'http://localhost:8080/api/vinetas/'

@Injectable()
export class EventsService {

    constructor(private http: Http, private router: Router){}
    //---------------------
    getEvents(){
        var url = "https://4ybwsxnunf.execute-api.us-east-1.amazonaws.com/dev/talkclass/events"
        console.log(url)
        return this.http.get(url)
            .map(response => this.generateEvents(response.json()))
            .catch(error => this.handleError(error))
    }

    generateEvents(events:any[]){
        var lu: Event[] = []
        for (let event of events){
            lu.push(this.generateEvent(event))
        }
        return lu
    }

    generateEvent(event: Event){
        return new Event(event['Title'],event['Description'],event['Date'],event['Classrooms'],event['Place'])
    }
    createEvent(title:string, description: string, place:string, date:string, classrooms:string[]){
        let url = "https://4ybwsxnunf.execute-api.us-east-1.amazonaws.com/dev/talkclass/events"
        let body = {
            title: title,
            description: description,
            date: date,
            place: place,
            classrooms: classrooms
        }
        return this.http.post(url,body).map(
            response => {
                console.log("status creacion evento: "+response.status)
            },
            error => {console.error(error)}
        );
    }
    //--------------
  
    private handleError(error: any) {
		console.error(error);
		return Observable.throw("Server error (" + error.status + "): " + error.text());
	}
}