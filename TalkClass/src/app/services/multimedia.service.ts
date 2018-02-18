import {
    Event
} from '../classes/Evento.class';


import {
    Injectable
} from '@angular/core';
import {
    Http,
    Response,
    JsonpModule,
    RequestOptions,
    Headers
} from '@angular/http';
import {
    LoginService
} from './login.service';
import {
    Router,
    ActivatedRoute
} from '@angular/router';

import {
    Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {
    Multimedia
} from '../classes/Multimedia.class';


@Injectable()
export class MultimediaService {
    apigClientFactory = require('aws-api-gateway-client').default;
    config = {
        accessKey: this.ServicioLogin.user_logged.get_access_key(),
        secretKey: this.ServicioLogin.user_logged.get_secret_key(),
        sessionToken: this.ServicioLogin.user_logged.get_session_token(), //OPTIONAL: If you are using temporary credentials you must include the session token
        region: 'us-east-1',
        invokeUrl: 'https://15psp95at5.execute-api.us-east-1.amazonaws.com'
    }
    apigClient = this.apigClientFactory.newClient(this.config);

    constructor(private http: Http, private router: Router, private ServicioLogin: LoginService) {}
    //---------------------
    get_multimedias() {
        var params = {};
        var pathTemplate = '/dev/talkclass/multimedia'
        var method = 'GET';
        var additionalParams = {};
        var body = {};

        return this.apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
            .then(
                result => {
                    return this.generate_multimedias(result['data'])
                }
            ).catch(function(result) {
                console.log('Hubo un error usando invokeApi')
                console.log(result)
            });
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

    generate_multimedias(multimedias: any[]) {
        var lu: Multimedia[] = []
        for (let multimedia of multimedias) {
            lu.push(this.generate_multimedia(multimedia))
        }
        return lu
    }

    generate_multimedia(multimedia: Multimedia) {
        return new Multimedia(multimedia['Picture Key'], multimedia['Event'], multimedia['Date'], multimedia['Tags'], multimedia['Title'], multimedia['Username'])
    }
    post_multimedia(session_token: string, event_title: string, event_date: string, title: string, file: string) {
        var params = {};
        var pathTemplate = '/dev/talkclass/multimedia'
        var method = 'POST';
        var additionalParams = {};
        var body = {
            session_token: session_token,
            event: event_title,
            event_date: event_date,
            title: title,
            file: file
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