import { Event } from '../classes/Evento.class';

import { Injectable } from '@angular/core';
import { Http, Response, JsonpModule, RequestOptions, Headers } from '@angular/http';
import { LoginService } from './login.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Classroom } from '../classes/Classroom.class';
import { error } from 'selenium-webdriver';

@Injectable()
export class EventsService {
    apigClientFactory = require('aws-api-gateway-client').default;
    config = {
        accessKey: this.ServicioLogin.user_logged.get_access_key(),
        secretKey: this.ServicioLogin.user_logged.get_secret_key(),
        sessionToken: this.ServicioLogin.user_logged.get_session_token(), //OPTIONAL: If you are using temporary credentials you must include the session token
        region: 'us-east-1',
        invokeUrl: 'https://15psp95at5.execute-api.us-east-1.amazonaws.com'
    }
    apigClient = this.apigClientFactory.newClient(this.config);

    constructor(private http: Http, private router: Router, private ServicioLogin: LoginService){}
    //---------------------
    get_events(){
        var params = {};
        var pathTemplate = '/dev/talkclass/events'
        var method = 'GET';
        var additionalParams = {};
        var body = {};

        return this.apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
            .then(
                result => {
                    return this.generate_events(result['data'])
                }
            ).catch(function(result) {
                console.log('Hubo un error usando invokeApi')
                console.log(result)
            });
    }
    

    get_event(title: string, date:string){
        var params = {};
        // Template syntax follows url-template https://www.npmjs.com/package/url-template
        var pathTemplate = '/dev/talkclass/events/?title='+title
        var method = 'GET';
        var additionalParams = {};
        var body = {};

        return this.apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
            .then(
                result => {
                    return this.generate_events(result['data'])
                }
            ).catch(function(result) {
                console.log('Hubo un error usando invokeApi')
                console.log(result)
            });
    }
    
    generate_events(events:any[]){
        var lu: Event[] = []
        for (let event of events){
            lu.push(this.generate_event(event))
        }
        return lu
    }

    generate_event(event: Event){
        return new Event(event['Title'],event['Description'],event['Date'],event['Classrooms'],event['Place'], event['Picture'], event['Tags'])
    }
    create_event(title:string, description: string, place:string, date:string, classrooms:string[], photo_event:string, photo_event_name:string){     
        var params = {};
        var pathTemplate = '/dev/talkclass/events'
        var method = 'POST';
        var additionalParams = {};
        var body = {
            title: title,
            description: description,
            date: date,
            place: place,
            classrooms: classrooms,
            photo_event:photo_event,
            photo_name: photo_event_name
        }
        return this.apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
            .then(
                result => {
                    return result.status
                }
            ).catch(function(result) {
                console.log('Hubo un error usando invokeApi')
                console.log(result)
            });
    }

    modify_event(new_classrooms: string[], event:Event){
        var date = event.date.split('/')
        var event_date = date[0]+'-'+date[1]+'-'+date[2]
        var params = {};
        var pathTemplate = '/dev/talkclass/events/'+event_date+'/'+event.title
        var method = 'PUT';
        var additionalParams = {};
        let body = {
            title: event.title,
            date: event_date,
            place: event.place,
            classrooms: new_classrooms,
            description: event.description
        }
        return this.apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
            .then(
                result => {
                    return result.status
                }
            ).catch(function(result) {
                console.log('Hubo un error usando invokeApi')
                console.log(result)
            });
    }
    //--------------
  
    private handleError(error: any) {
		console.error(error);
		return Observable.throw("Server error (" + error.status + "): " + error.text());
	}
}