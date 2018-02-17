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
import { Multimedia } from '../classes/Multimedia.class';

const BASE_URL = 'https://15psp95at5.execute-api.us-east-1.amazonaws.com/dev/talkclass/multimedia/'


@Injectable()
export class MultimediaService {
    const
    constructor(private http: Http, private router: Router){}
    //---------------------
    get_multimedias(){
        console.log(BASE_URL)
        return this.http.get(BASE_URL)
            .map(response => this.generate_multimedias(response.json()))
            .catch(error => this.handleError(error))
    }
/*
    get_multimedia(title: string, date:string){
        var url = BASE_URL+'?title='+title
        console.log('requesting url: ' +url)
        return this.http.get(url)
            .map(response => this.generateEvents(response.json()))
            .catch(error => this.handleError(error))
    }
 */   

    generate_multimedias(multimedias:any[]){
        var lu: Multimedia[] = []
        for (let multimedia of multimedias){
            lu.push(this.generate_multimedia(multimedia))
        }
        return lu
    }

    generate_multimedia(multimedia: Multimedia){
        return new Multimedia(multimedia['Picture Key'],multimedia['Event'],multimedia['Date'], multimedia['Tags'],multimedia['Title'],multimedia['Username'])
    }
    post_multimedia(session_token:string, event_title:string, event_date: string, title:string, file:string){
        let body = {
            session_token: session_token,
            event: event_title,
            event_date: event_date,
            title: title,
            file: file
        }
        return this.http.post(BASE_URL,body).map(
            response => {
                console.log("status uploading picture: "+response.status)
            },
            error => {console.error(error)}
        );
    }

    put_multimedia(new_classrooms: string[], event:Event){
        var date = event.date.split('/')
        var event_date = date[0]+'-'+date[1]+'-'+date[2]
        console.log('date: '+event_date)
        console.log('date replaced: '+event_date)

        var url = BASE_URL+event_date+'/'+event.title
        console.log('la url es : '+url)
        let body = {
            title: event.title,
            date: event_date,
            place: event.place,
            classrooms: new_classrooms,
            description: event.description
        }
        return this.http.put(url , body).map(
            response=> {
                console.log("status modification event: "+response.status)
            },
            error => {console.error(error)}
        )
    }
    //--------------
  
    private handleError(error: any) {
		console.error(error);
		return Observable.throw("Server error (" + error.status + "): " + error.text());
	}
}